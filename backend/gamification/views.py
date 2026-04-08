from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Achievement, DriverAchievement
from .serializers import AchievementSerializer, DriverAchievementSerializer


class AchievementListView(generics.ListAPIView):
    queryset           = Achievement.objects.all()
    serializer_class   = AchievementSerializer
    permission_classes = [permissions.AllowAny]


class MyAchievementsView(generics.ListAPIView):
    serializer_class   = DriverAchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DriverAchievement.objects.filter(
            driver=self.request.user.driver_profile
        ).select_related('achievement').order_by('-earned_at')
