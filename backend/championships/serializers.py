from rest_framework import serializers
from .models import Championship, ChampionshipEntry


class ChampionshipSerializer(serializers.ModelSerializer):
    entry_count = serializers.SerializerMethodField()

    class Meta:
        model  = Championship
        fields = (
            'id', 'name', 'season', 'description', 'status',
            'starts_at', 'ends_at', 'max_drivers', 'entry_count', 'created_at',
        )
        read_only_fields = ('created_at',)

    def get_entry_count(self, obj):
        return obj.entries.count()


class ChampionshipEntrySerializer(serializers.ModelSerializer):
    driver_nickname = serializers.CharField(source='driver.nickname', read_only=True)
    driver_tier     = serializers.CharField(source='driver.skill_tier', read_only=True)
    driver_avatar   = serializers.ImageField(source='driver.avatar', read_only=True)

    class Meta:
        model  = ChampionshipEntry
        fields = (
            'id', 'championship', 'driver', 'driver_nickname', 'driver_tier',
            'driver_avatar', 'points', 'position', 'joined_at',
        )
        read_only_fields = ('points', 'position', 'joined_at')
