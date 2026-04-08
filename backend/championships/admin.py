from django.contrib import admin
from .models import Championship, ChampionshipEntry


class EntryInline(admin.TabularInline):
    model   = ChampionshipEntry
    extra   = 0
    fields  = ('driver', 'points', 'position', 'joined_at')
    readonly_fields = ('points', 'position', 'joined_at')


@admin.register(Championship)
class ChampionshipAdmin(admin.ModelAdmin):
    list_display  = ('name', 'season', 'status', 'starts_at', 'ends_at')
    list_filter   = ('status', 'season')
    search_fields = ('name',)
    inlines       = [EntryInline]


@admin.register(ChampionshipEntry)
class ChampionshipEntryAdmin(admin.ModelAdmin):
    list_display  = ('driver', 'championship', 'points', 'position')
    list_filter   = ('championship',)
    search_fields = ('driver__nickname',)
    ordering      = ('-points',)
