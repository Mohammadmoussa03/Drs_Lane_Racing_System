from django.contrib import admin
from .models import Race, Booking, RaceResult, RaceWaitlist


class BookingInline(admin.TabularInline):
    model  = Booking
    extra  = 0
    fields = ('driver', 'status', 'amount_paid', 'booked_at')
    readonly_fields = ('booked_at',)


class RaceResultInline(admin.TabularInline):
    model  = RaceResult
    extra  = 0
    fields = ('position', 'driver', 'best_lap_ms', 'total_time_ms', 'points_awarded', 'fastest_lap', 'dnf')
    readonly_fields = ('points_awarded',)


@admin.register(Race)
class RaceAdmin(admin.ModelAdmin):
    list_display  = ('title', 'race_type', 'skill_level', 'scheduled_at', 'status', 'booked_count', 'max_drivers')
    list_filter   = ('race_type', 'status', 'skill_level')
    search_fields = ('title', 'track_name')
    ordering      = ('scheduled_at',)
    inlines       = [BookingInline, RaceResultInline]

    def booked_count(self, obj):
        return obj.booked_count
    booked_count.short_description = 'Booked'


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display  = ('driver', 'race', 'status', 'amount_paid', 'booked_at')
    list_filter   = ('status',)
    search_fields = ('driver__nickname', 'race__title')


@admin.register(RaceResult)
class RaceResultAdmin(admin.ModelAdmin):
    list_display  = ('race', 'driver', 'position', 'points_awarded', 'fastest_lap', 'dnf')
    list_filter   = ('fastest_lap', 'dnf')
    search_fields = ('driver__nickname', 'race__title')
    ordering      = ('race', 'position')


@admin.register(RaceWaitlist)
class RaceWaitlistAdmin(admin.ModelAdmin):
    list_display  = ('race', 'driver', 'position', 'status', 'joined_at')
    list_filter   = ('status',)
    search_fields = ('driver__nickname', 'race__title')
    ordering      = ('race', 'position')
