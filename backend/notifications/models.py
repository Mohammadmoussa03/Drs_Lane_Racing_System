from django.db import models


class Notification(models.Model):
    TYPE_ACHIEVEMENT    = 'achievement'
    TYPE_RANK_CHANGE    = 'rank_change'
    TYPE_RESULT_POSTED  = 'result_posted'
    TYPE_WAITLIST       = 'waitlist'
    TYPE_RACE_REMINDER  = 'race_reminder'
    TYPE_CHECKIN        = 'checkin'
    TYPE_GENERAL        = 'general'

    TYPE_CHOICES = [
        (TYPE_ACHIEVEMENT,   'Achievement Unlocked'),
        (TYPE_RANK_CHANGE,   'Rank Change'),
        (TYPE_RESULT_POSTED, 'Race Result Posted'),
        (TYPE_WAITLIST,      'Waitlist Update'),
        (TYPE_RACE_REMINDER, 'Race Reminder'),
        (TYPE_CHECKIN,       'Check-In'),
        (TYPE_GENERAL,       'General'),
    ]

    driver     = models.ForeignKey(
        'users.DriverProfile', on_delete=models.CASCADE, related_name='notifications'
    )
    type       = models.CharField(max_length=20, choices=TYPE_CHOICES, default=TYPE_GENERAL)
    title      = models.CharField(max_length=120)
    message    = models.TextField()
    is_read    = models.BooleanField(default=False)
    # Optional link data for frontend routing
    link       = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f'[{self.type}] {self.driver.nickname} — {self.title}'
