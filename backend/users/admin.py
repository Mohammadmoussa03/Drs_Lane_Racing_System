from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, DriverProfile, EmailVerificationToken, PasswordResetToken


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display  = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'username')
    ordering      = ('email',)


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    list_display  = ('user', 'token', 'created_at')
    search_fields = ('user__email',)


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display  = ('user', 'token', 'used', 'created_at')
    list_filter   = ('used',)
    search_fields = ('user__email',)


@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display   = ('nickname', 'skill_tier', 'total_points', 'rank', 'total_races', 'wins', 'subscription')
    list_filter    = ('skill_tier', 'subscription')
    search_fields  = ('nickname', 'user__email')
    readonly_fields = ('total_races', 'wins', 'podiums', 'fastest_laps', 'total_points', 'rank')
    ordering       = ('-total_points',)
