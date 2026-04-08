"""
Central notification factory.
All other services call these functions — never create Notification rows directly.
"""
from notifications.models import Notification


def notify(driver, type: str, title: str, message: str, link: str = '') -> Notification:
    return Notification.objects.create(
        driver=driver, type=type, title=title, message=message, link=link
    )


# ─── Typed helpers (call these from other services) ───────────────────────────

def notify_achievement(driver, achievement_name: str, points_bonus: int = 0):
    bonus = f' +{points_bonus} bonus points!' if points_bonus else ''
    notify(
        driver,
        type    = Notification.TYPE_ACHIEVEMENT,
        title   = f'Achievement Unlocked: {achievement_name}',
        message = f'You\'ve earned the "{achievement_name}" achievement.{bonus}',
        link    = '/dashboard',
    )


def notify_result_posted(driver, race_title: str, position: int, points: int, fastest_lap: bool = False):
    fl_text = ' 🟣 Fastest Lap bonus!' if fastest_lap else ''
    notify(
        driver,
        type    = Notification.TYPE_RESULT_POSTED,
        title   = f'Race Result: {race_title}',
        message = f'You finished P{position} and earned {points} championship points.{fl_text}',
        link    = '/dashboard',
    )


def notify_rank_change(driver, old_rank: int, new_rank: int):
    if old_rank == 0 or old_rank == new_rank:
        return
    direction = 'up' if new_rank < old_rank else 'down'
    change    = abs(old_rank - new_rank)
    notify(
        driver,
        type    = Notification.TYPE_RANK_CHANGE,
        title   = f'Rank {"Gained" if direction == "up" else "Lost"}',
        message = f'You moved {direction} {change} place{"s" if change > 1 else ""} to #{new_rank} on the global leaderboard.',
        link    = '/leaderboard',
    )


def notify_waitlist_promoted(driver, race_title: str):
    notify(
        driver,
        type    = Notification.TYPE_WAITLIST,
        title   = 'You\'re Off the Waitlist!',
        message = f'A slot opened in "{race_title}". Your booking is now confirmed.',
        link    = '/dashboard',
    )


def notify_checkin(driver, race_title: str):
    notify(
        driver,
        type    = Notification.TYPE_CHECKIN,
        title   = 'Checked In!',
        message = f'You\'ve been checked in for "{race_title}". Get ready to race!',
        link    = '/dashboard',
    )


def notify_race_reminder(driver, race_title: str, minutes: int = 60):
    notify(
        driver,
        type    = Notification.TYPE_RACE_REMINDER,
        title   = f'Race in {minutes} minutes',
        message = f'"{race_title}" starts in {minutes} minutes. Head to the pits!',
        link    = '/races',
    )
