import uuid
from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone


class User(AbstractUser):
    email              = models.EmailField(unique=True)
    is_email_verified  = models.BooleanField(default=False)
    USERNAME_FIELD     = 'email'
    REQUIRED_FIELDS    = ['username']

    class Meta:
        db_table = 'users'


class DriverProfile(models.Model):
    TIER_BRONZE = 'Bronze'
    TIER_SILVER = 'Silver'
    TIER_GOLD   = 'Gold'
    TIER_ELITE  = 'Elite'
    TIER_CHOICES = [
        (TIER_BRONZE, 'Bronze'),
        (TIER_SILVER, 'Silver'),
        (TIER_GOLD,   'Gold'),
        (TIER_ELITE,  'Elite'),
    ]

    user         = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='driver_profile')
    nickname     = models.CharField(max_length=50, unique=True)
    avatar       = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio          = models.TextField(blank=True)
    total_races  = models.PositiveIntegerField(default=0)
    wins         = models.PositiveIntegerField(default=0)
    podiums      = models.PositiveIntegerField(default=0)
    fastest_laps = models.PositiveIntegerField(default=0)
    total_points = models.PositiveIntegerField(default=0)
    rank         = models.PositiveIntegerField(default=0)
    skill_tier   = models.CharField(max_length=10, choices=TIER_CHOICES, default=TIER_BRONZE)

    SUBSCRIPTION_FREE   = 'free'
    SUBSCRIPTION_SILVER = 'silver'
    SUBSCRIPTION_GOLD   = 'gold'
    SUBSCRIPTION_CHOICES = [
        (SUBSCRIPTION_FREE,   'Free'),
        (SUBSCRIPTION_SILVER, 'Silver'),
        (SUBSCRIPTION_GOLD,   'Gold'),
    ]
    subscription         = models.CharField(max_length=10, choices=SUBSCRIPTION_CHOICES, default=SUBSCRIPTION_FREE)
    subscription_expires = models.DateTimeField(null=True, blank=True)
    discount_pct         = models.PositiveSmallIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'driver_profiles'
        ordering = ['-total_points']

    def __str__(self):
        return f'{self.nickname} [{self.skill_tier}]'

    def recalculate_tier(self):
        for threshold, tier in settings.SKILL_TIERS:
            if self.total_points >= threshold:
                self.skill_tier = tier
                return
        self.skill_tier = self.TIER_BRONZE


# ─── Email Verification ───────────────────────────────────────────────────────

class EmailVerificationToken(models.Model):
    user       = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='email_token')
    token      = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'email_verification_tokens'

    def is_expired(self):
        expiry = self.created_at + timedelta(hours=settings.EMAIL_VERIFICATION_EXPIRY_HOURS)
        return timezone.now() > expiry

    def __str__(self):
        return f'VerifyToken({self.user.email})'


# ─── Password Reset ───────────────────────────────────────────────────────────

class PasswordResetToken(models.Model):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='password_reset_tokens')
    token      = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    used       = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'password_reset_tokens'

    def is_expired(self):
        expiry = self.created_at + timedelta(hours=settings.PASSWORD_RESET_EXPIRY_HOURS)
        return timezone.now() > expiry

    def __str__(self):
        return f'ResetToken({self.user.email})'
