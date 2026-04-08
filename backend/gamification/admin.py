from django.contrib import admin
from .models import Achievement, DriverAchievement


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display  = ('code', 'name', 'category', 'points_bonus')
    list_filter   = ('category',)
    search_fields = ('code', 'name')


@admin.register(DriverAchievement)
class DriverAchievementAdmin(admin.ModelAdmin):
    list_display  = ('driver', 'achievement', 'earned_at')
    list_filter   = ('achievement',)
    search_fields = ('driver__nickname',)
    ordering      = ('-earned_at',)
