"""
F1-style points and driver stats service.
All post-race business logic lives here — no business logic in views.
"""
from django.conf import settings
from django.db import transaction

from races.models import Race, RaceResult, Booking
from championships.models import ChampionshipEntry
from gamification.services.achievement_service import check_and_award_achievements


F1_POINTS: dict[int, int] = settings.F1_POINTS


def get_points_for_position(position: int) -> int:
    return F1_POINTS.get(position, 0)


@transaction.atomic
def submit_race_results(race: Race, results_data: list[dict]) -> list[RaceResult]:
    from notifications.services.notification_service import notify_result_posted, notify_rank_change

    created_results = []
    fl_driver_id    = _resolve_fastest_lap(results_data)

    # Snapshot ranks before update
    old_ranks = {d.pk: d.rank for d in __import__('users.models', fromlist=['DriverProfile']).DriverProfile.objects.all()}

    for entry in results_data:
        driver_profile = _get_driver(entry['driver_id'])
        position       = entry['position']
        dnf            = entry.get('dnf', False)
        is_fl          = (entry.get('driver_id') == fl_driver_id)

        pts = 0 if dnf else get_points_for_position(position)
        if is_fl and not dnf and position <= 10:
            pts += 1

        result, _ = RaceResult.objects.update_or_create(
            race=race,
            driver=driver_profile,
            defaults={
                'position':       position,
                'best_lap_ms':    entry.get('best_lap_ms'),
                'total_time_ms':  entry.get('total_time_ms'),
                'points_awarded': pts,
                'fastest_lap':    is_fl,
                'dnf':            dnf,
            }
        )
        created_results.append(result)
        _update_driver_stats(driver_profile, position, pts, is_fl, dnf)

        # Notify driver of result
        notify_result_posted(driver_profile, race.title, position, pts, is_fl)

    if race.championship:
        _update_championship_standings(race.championship)

    _recalculate_global_ranks()

    # Notify rank changes
    from users.models import DriverProfile
    for driver in DriverProfile.objects.all():
        old = old_ranks.get(driver.pk, 0)
        notify_rank_change(driver, old, driver.rank)

    # Achievements
    for result in created_results:
        check_and_award_achievements(result.driver, result)

    race.status = Race.STATUS_COMPLETED
    race.save(update_fields=['status'])

    Booking.objects.filter(race=race, status=Booking.STATUS_CONFIRMED).update(
        status=Booking.STATUS_ATTENDED
    )

    return created_results


# ─── Internal helpers ─────────────────────────────────────────────────────────

def _resolve_fastest_lap(results_data: list[dict]):
    explicit = [r for r in results_data if r.get('fastest_lap')]
    if explicit:
        return explicit[0]['driver_id']
    timed = [r for r in results_data if r.get('best_lap_ms') and not r.get('dnf')]
    if timed:
        return min(timed, key=lambda r: r['best_lap_ms'])['driver_id']
    return None


def _get_driver(driver_id: int):
    from users.models import DriverProfile
    return DriverProfile.objects.select_for_update().get(pk=driver_id)


def _update_driver_stats(driver, position: int, pts: int, fastest_lap: bool, dnf: bool):
    driver.total_races  += 1
    driver.total_points += pts
    if position == 1 and not dnf:
        driver.wins    += 1
        driver.podiums += 1
    elif position in (2, 3) and not dnf:
        driver.podiums += 1
    if fastest_lap:
        driver.fastest_laps += 1
    driver.recalculate_tier()
    driver.save(update_fields=[
        'total_races', 'total_points', 'wins', 'podiums', 'fastest_laps', 'skill_tier'
    ])


def _update_championship_standings(championship):
    from races.models import RaceResult
    from django.db.models import Sum
    entries = ChampionshipEntry.objects.filter(championship=championship).select_for_update()
    for entry in entries:
        pts = RaceResult.objects.filter(
            race__championship=championship,
            driver=entry.driver
        ).aggregate(total=Sum('points_awarded'))['total'] or 0
        entry.points = pts
        entry.save(update_fields=['points'])

    for rank, entry in enumerate(
        ChampionshipEntry.objects.filter(championship=championship).order_by('-points'), start=1
    ):
        entry.position = rank
        entry.save(update_fields=['position'])


def _recalculate_global_ranks():
    from users.models import DriverProfile
    drivers = DriverProfile.objects.order_by('-total_points').select_for_update()
    for rank, driver in enumerate(drivers, start=1):
        driver.rank = rank
        driver.save(update_fields=['rank'])
