from django.db import models
from django.conf import settings
from django.utils import timezone


class Race(models.Model):
    TYPE_PRACTICE    = 'Practice'
    TYPE_QUALIFYING  = 'Qualifying'
    TYPE_GRAND_PRIX  = 'Grand Prix'
    TYPE_CHOICES = [
        (TYPE_PRACTICE,   'Practice'),
        (TYPE_QUALIFYING, 'Qualifying'),
        (TYPE_GRAND_PRIX, 'Grand Prix'),
    ]

    SKILL_ALL     = 'All'
    SKILL_BEGINNER = 'Beginner'
    SKILL_INTERMEDIATE = 'Intermediate'
    SKILL_ADVANCED = 'Advanced'
    SKILL_CHOICES = [
        (SKILL_ALL,          'All Levels'),
        (SKILL_BEGINNER,     'Beginner'),
        (SKILL_INTERMEDIATE, 'Intermediate'),
        (SKILL_ADVANCED,     'Advanced'),
    ]

    STATUS_OPEN       = 'Open'
    STATUS_FULL       = 'Full'
    STATUS_IN_PROGRESS = 'In Progress'
    STATUS_COMPLETED  = 'Completed'
    STATUS_CANCELLED  = 'Cancelled'
    STATUS_CHOICES = [
        (STATUS_OPEN,        'Open'),
        (STATUS_FULL,        'Full'),
        (STATUS_IN_PROGRESS, 'In Progress'),
        (STATUS_COMPLETED,   'Completed'),
        (STATUS_CANCELLED,   'Cancelled'),
    ]

    title         = models.CharField(max_length=120)
    race_type     = models.CharField(max_length=20, choices=TYPE_CHOICES, default=TYPE_PRACTICE)
    skill_level   = models.CharField(max_length=20, choices=SKILL_CHOICES, default=SKILL_ALL)
    scheduled_at  = models.DateTimeField()
    duration_mins = models.PositiveSmallIntegerField(default=15)
    max_drivers   = models.PositiveSmallIntegerField(default=12)
    price         = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    status        = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_OPEN)
    track_name    = models.CharField(max_length=100, default='DRS Lane Main Circuit')
    notes         = models.TextField(blank=True)
    # Championship link (nullable — standalone races allowed)
    championship  = models.ForeignKey(
        'championships.Championship', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='races'
    )
    created_by    = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='created_races'
    )
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'races'
        ordering = ['scheduled_at']

    def __str__(self):
        return f'{self.title} — {self.scheduled_at:%Y-%m-%d %H:%M}'

    @property
    def booked_count(self):
        return self.bookings.filter(status=Booking.STATUS_CONFIRMED).count()

    @property
    def is_full(self):
        return self.booked_count >= self.max_drivers


class Booking(models.Model):
    STATUS_PENDING   = 'Pending'
    STATUS_CONFIRMED = 'Confirmed'
    STATUS_CANCELLED = 'Cancelled'
    STATUS_ATTENDED  = 'Attended'
    STATUS_CHOICES = [
        (STATUS_PENDING,   'Pending'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_CANCELLED, 'Cancelled'),
        (STATUS_ATTENDED,  'Attended'),
    ]

    driver  = models.ForeignKey(
        'users.DriverProfile', on_delete=models.CASCADE, related_name='bookings'
    )
    race    = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='bookings')
    status  = models.CharField(max_length=15, choices=STATUS_CHOICES, default=STATUS_PENDING)
    # Payment (placeholder for future payment gateway)
    amount_paid    = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    payment_ref    = models.CharField(max_length=100, blank=True)
    booked_at      = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bookings'
        unique_together = ('driver', 'race')
        ordering = ['-booked_at']

    def __str__(self):
        return f'{self.driver.nickname} → {self.race.title}'


class RaceResult(models.Model):
    race          = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='results')
    driver        = models.ForeignKey(
        'users.DriverProfile', on_delete=models.CASCADE, related_name='results'
    )
    position      = models.PositiveSmallIntegerField()
    best_lap_ms   = models.PositiveIntegerField(null=True, blank=True, help_text='Best lap time in milliseconds')
    total_time_ms = models.PositiveIntegerField(null=True, blank=True, help_text='Total race time in milliseconds')
    points_awarded = models.PositiveSmallIntegerField(default=0)
    fastest_lap   = models.BooleanField(default=False)
    dnf           = models.BooleanField(default=False, verbose_name='Did Not Finish')
    notes         = models.TextField(blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'race_results'
        unique_together = ('race', 'driver')
        ordering = ['position']

    def __str__(self):
        return f'P{self.position} {self.driver.nickname} @ {self.race.title}'


# ─── Waitlist ─────────────────────────────────────────────────────────────────

class RaceWaitlist(models.Model):
    STATUS_WAITING   = 'Waiting'
    STATUS_PROMOTED  = 'Promoted'
    STATUS_EXPIRED   = 'Expired'
    STATUS_CANCELLED = 'Cancelled'
    STATUS_CHOICES = [
        (STATUS_WAITING,   'Waiting'),
        (STATUS_PROMOTED,  'Promoted'),
        (STATUS_EXPIRED,   'Expired'),
        (STATUS_CANCELLED, 'Cancelled'),
    ]

    driver    = models.ForeignKey('users.DriverProfile', on_delete=models.CASCADE, related_name='waitlist_entries')
    race      = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='waitlist')
    position  = models.PositiveSmallIntegerField()          # queue position (1 = next in line)
    status    = models.CharField(max_length=15, choices=STATUS_CHOICES, default=STATUS_WAITING)
    joined_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table        = 'race_waitlist'
        unique_together = ('driver', 'race')
        ordering        = ['position']

    def __str__(self):
        return f'Waitlist P{self.position}: {self.driver.nickname} → {self.race.title}'
