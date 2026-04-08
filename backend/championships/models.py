from django.db import models
from django.conf import settings


class Championship(models.Model):
    STATUS_UPCOMING  = 'Upcoming'
    STATUS_ACTIVE    = 'Active'
    STATUS_COMPLETED = 'Completed'
    STATUS_CHOICES = [
        (STATUS_UPCOMING,  'Upcoming'),
        (STATUS_ACTIVE,    'Active'),
        (STATUS_COMPLETED, 'Completed'),
    ]

    name        = models.CharField(max_length=120)
    season      = models.PositiveSmallIntegerField(help_text='Season year, e.g. 2025')
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=15, choices=STATUS_CHOICES, default=STATUS_UPCOMING)
    starts_at   = models.DateField()
    ends_at     = models.DateField()
    max_drivers = models.PositiveSmallIntegerField(default=50)
    created_by  = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='created_championships'
    )
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'championships'
        ordering = ['-season', 'name']

    def __str__(self):
        return f'{self.name} — Season {self.season}'


class ChampionshipEntry(models.Model):
    championship = models.ForeignKey(Championship, on_delete=models.CASCADE, related_name='entries')
    driver       = models.ForeignKey(
        'users.DriverProfile', on_delete=models.CASCADE, related_name='championship_entries'
    )
    points       = models.PositiveIntegerField(default=0)
    position     = models.PositiveSmallIntegerField(default=0)
    joined_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'championship_entries'
        unique_together = ('championship', 'driver')
        ordering = ['-points']

    def __str__(self):
        return f'{self.driver.nickname} in {self.championship.name}'
