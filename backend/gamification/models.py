from django.db import models


class Achievement(models.Model):
    CATEGORY_RACE      = 'Race'
    CATEGORY_SKILL     = 'Skill'
    CATEGORY_SOCIAL    = 'Social'
    CATEGORY_MILESTONE = 'Milestone'
    CATEGORY_CHOICES = [
        (CATEGORY_RACE,      'Race'),
        (CATEGORY_SKILL,     'Skill'),
        (CATEGORY_SOCIAL,    'Social'),
        (CATEGORY_MILESTONE, 'Milestone'),
    ]

    code        = models.CharField(max_length=50, unique=True)
    name        = models.CharField(max_length=100)
    description = models.TextField()
    category    = models.CharField(max_length=15, choices=CATEGORY_CHOICES, default=CATEGORY_RACE)
    icon        = models.CharField(max_length=50, default='trophy')  # icon name for frontend
    points_bonus = models.PositiveSmallIntegerField(default=0)        # bonus points on unlock

    class Meta:
        db_table = 'achievements'

    def __str__(self):
        return self.name


class DriverAchievement(models.Model):
    driver      = models.ForeignKey(
        'users.DriverProfile', on_delete=models.CASCADE, related_name='achievements'
    )
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='earned_by')
    earned_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'driver_achievements'
        unique_together = ('driver', 'achievement')
        ordering = ['-earned_at']

    def __str__(self):
        return f'{self.driver.nickname} — {self.achievement.name}'
