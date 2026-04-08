from rest_framework import serializers
from .models import Achievement, DriverAchievement


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Achievement
        fields = ('id', 'code', 'name', 'description', 'category', 'icon', 'points_bonus')


class DriverAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(read_only=True)

    class Meta:
        model  = DriverAchievement
        fields = ('id', 'achievement', 'earned_at')
