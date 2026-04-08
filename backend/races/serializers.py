from rest_framework import serializers
from .models import Race, Booking, RaceResult, RaceWaitlist


class RaceSerializer(serializers.ModelSerializer):
    booked_count = serializers.IntegerField(read_only=True)
    is_full      = serializers.BooleanField(read_only=True)
    championship_name = serializers.CharField(source='championship.name', read_only=True, default=None)

    class Meta:
        model  = Race
        fields = (
            'id', 'title', 'race_type', 'skill_level', 'scheduled_at', 'duration_mins',
            'max_drivers', 'booked_count', 'is_full', 'price', 'status', 'track_name',
            'notes', 'championship', 'championship_name', 'created_at',
        )
        read_only_fields = ('created_at',)


class BookingSerializer(serializers.ModelSerializer):
    race_title    = serializers.CharField(source='race.title', read_only=True)
    race_type     = serializers.CharField(source='race.race_type', read_only=True)
    scheduled_at  = serializers.DateTimeField(source='race.scheduled_at', read_only=True)
    driver_nickname = serializers.CharField(source='driver.nickname', read_only=True)

    class Meta:
        model  = Booking
        fields = (
            'id', 'driver', 'race', 'race_title', 'race_type', 'scheduled_at',
            'driver_nickname', 'status', 'amount_paid', 'payment_ref', 'booked_at',
        )
        read_only_fields = ('driver', 'status', 'booked_at')


class RaceResultSerializer(serializers.ModelSerializer):
    driver_nickname = serializers.CharField(source='driver.nickname', read_only=True)
    driver_tier     = serializers.CharField(source='driver.skill_tier', read_only=True)
    best_lap_display = serializers.SerializerMethodField()

    class Meta:
        model  = RaceResult
        fields = (
            'id', 'race', 'driver', 'driver_nickname', 'driver_tier', 'position',
            'best_lap_ms', 'best_lap_display', 'total_time_ms', 'points_awarded',
            'fastest_lap', 'dnf', 'notes', 'created_at',
        )
        read_only_fields = ('points_awarded', 'created_at')

    def get_best_lap_display(self, obj):
        """Convert ms to M:SS.mmm string."""
        if obj.best_lap_ms is None:
            return None
        ms    = obj.best_lap_ms
        mins  = ms // 60000
        secs  = (ms % 60000) / 1000
        return f'{mins}:{secs:06.3f}'


class WaitlistSerializer(serializers.ModelSerializer):
    driver_nickname = serializers.CharField(source='driver.nickname', read_only=True)

    class Meta:
        model  = RaceWaitlist
        fields = ('id', 'driver', 'driver_nickname', 'race', 'position', 'status', 'joined_at')
        read_only_fields = ('position', 'status', 'joined_at')


class SubmitResultsSerializer(serializers.Serializer):
    """Payload for POST /api/results/add/"""
    race_id = serializers.IntegerField()
    results = serializers.ListField(
        child=serializers.DictField(), min_length=1
    )

    def validate_results(self, value):
        required = {'driver_id', 'position'}
        for i, r in enumerate(value):
            missing = required - set(r.keys())
            if missing:
                raise serializers.ValidationError(
                    f'Result[{i}] missing fields: {missing}'
                )
            if not isinstance(r['position'], int) or r['position'] < 1:
                raise serializers.ValidationError(
                    f'Result[{i}] position must be a positive integer.'
                )
        return value
