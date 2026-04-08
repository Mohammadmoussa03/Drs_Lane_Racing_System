"""
Achievement checking and awarding service.
Add new achievement rules here — no logic scattered in views or signals.
"""
from gamification.models import Achievement, DriverAchievement


# ─── Achievement codes (must match seeded Achievement rows) ───────────────────
CODE_FIRST_RACE    = 'first_race'
CODE_FIRST_WIN     = 'first_win'
CODE_FIRST_PODIUM  = 'first_podium'
CODE_FASTEST_LAP   = 'fastest_lap'
CODE_10_RACES      = '10_races'
CODE_50_RACES      = '50_races'
CODE_100_POINTS    = '100_points'
CODE_500_POINTS    = '500_points'
CODE_HAT_TRICK     = 'hat_trick'      # 3 consecutive wins
CODE_SILVER_TIER   = 'silver_tier'
CODE_GOLD_TIER     = 'gold_tier'
CODE_ELITE_TIER    = 'elite_tier'


def check_and_award_achievements(driver, result=None):
    """
    Run all achievement checks for a driver after a race result is saved.
    Awards any newly unlocked achievements and credits bonus points.
    """
    _check(driver, CODE_FIRST_RACE,   driver.total_races >= 1)
    _check(driver, CODE_FIRST_WIN,    driver.wins >= 1)
    _check(driver, CODE_FIRST_PODIUM, driver.podiums >= 1)
    _check(driver, CODE_10_RACES,     driver.total_races >= 10)
    _check(driver, CODE_50_RACES,     driver.total_races >= 50)
    _check(driver, CODE_100_POINTS,   driver.total_points >= 100)
    _check(driver, CODE_500_POINTS,   driver.total_points >= 500)
    _check(driver, CODE_SILVER_TIER,  driver.skill_tier in ('Silver', 'Gold', 'Elite'))
    _check(driver, CODE_GOLD_TIER,    driver.skill_tier in ('Gold', 'Elite'))
    _check(driver, CODE_ELITE_TIER,   driver.skill_tier == 'Elite')
    if result and result.fastest_lap:
        _check(driver, CODE_FASTEST_LAP, True)


def _check(driver, code: str, condition: bool):
    if not condition:
        return
    try:
        achievement = Achievement.objects.get(code=code)
    except Achievement.DoesNotExist:
        return  # Achievement not seeded yet — skip gracefully

    already_earned = DriverAchievement.objects.filter(
        driver=driver, achievement=achievement
    ).exists()
    if already_earned:
        return

    DriverAchievement.objects.create(driver=driver, achievement=achievement)

    # Credit bonus points if any
    if achievement.points_bonus:
        driver.total_points += achievement.points_bonus
        driver.recalculate_tier()
        driver.save(update_fields=['total_points', 'skill_tier'])
