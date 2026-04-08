from django.db.models import F, Sum, Subquery, OuterRef, Count, Q
from django.utils.timezone import now
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import DriverProfile, EmailVerificationToken, PasswordResetToken
from .serializers import (
    RegisterSerializer, DriverProfileSerializer, LeaderboardEntrySerializer,
    PublicDriverProfileSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
)
from .email_utils import send_verification_email, send_password_reset_email
from gamification.serializers import DriverAchievementSerializer


# ─── Auth ─────────────────────────────────────────────────────────────────────

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class   = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_verification_email(user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'access':  str(refresh.access_token),
            'refresh': str(refresh),
            'driver':  DriverProfileSerializer(user.driver_profile).data,
            'detail':  'Account created. Please check your email to verify your address.',
        }, status=status.HTTP_201_CREATED)


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({'detail': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token_obj = EmailVerificationToken.objects.select_related('user').get(token=token)
        except EmailVerificationToken.DoesNotExist:
            return Response({'detail': 'Invalid verification token.'}, status=status.HTTP_400_BAD_REQUEST)

        if token_obj.is_expired():
            return Response({'detail': 'Token has expired. Request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        user = token_obj.user
        user.is_email_verified = True
        user.save(update_fields=['is_email_verified'])
        token_obj.delete()
        return Response({'detail': 'Email verified successfully. Welcome to DRS Lane!'})


class ResendVerificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.is_email_verified:
            return Response({'detail': 'Email already verified.'}, status=status.HTTP_400_BAD_REQUEST)
        send_verification_email(user)
        return Response({'detail': 'Verification email sent.'})


class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            send_password_reset_email(user)
        except User.DoesNotExist:
            pass  # Silent — don't reveal whether email exists
        return Response({'detail': 'If an account exists with that email, a reset link has been sent.'})


class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data, context={})
        serializer.is_valid(raise_exception=True)
        token_obj = serializer.context['token_obj']
        user = token_obj.user
        user.set_password(serializer.validated_data['password'])
        user.save(update_fields=['password'])
        token_obj.used = True
        token_obj.save(update_fields=['used'])
        return Response({'detail': 'Password reset successfully. You can now log in.'})


# ─── Driver ───────────────────────────────────────────────────────────────────

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class   = DriverProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.driver_profile


class DriverMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.driver_profile
        data = DriverProfileSerializer(profile).data
        from races.models import RaceResult
        from races.serializers import RaceResultSerializer
        recent = RaceResult.objects.filter(driver=profile).order_by('-created_at')[:10]
        data['recent_results'] = RaceResultSerializer(recent, many=True).data
        achievements = profile.achievements.select_related('achievement').order_by('-earned_at')
        data['achievements'] = DriverAchievementSerializer(achievements, many=True).data
        data['email_verified'] = request.user.is_email_verified
        return Response(data)


class PublicDriverProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, nickname):
        try:
            driver = DriverProfile.objects.get(nickname__iexact=nickname)
        except DriverProfile.DoesNotExist:
            return Response({'detail': 'Driver not found.'}, status=status.HTTP_404_NOT_FOUND)

        data = PublicDriverProfileSerializer(driver).data

        # Recent results (last 10)
        from races.models import RaceResult
        from races.serializers import RaceResultSerializer
        recent = RaceResult.objects.filter(driver=driver).select_related('race').order_by('-created_at')[:10]
        data['recent_results'] = RaceResultSerializer(recent, many=True).data

        # Achievements
        achievements = driver.achievements.select_related('achievement').order_by('-earned_at')
        from gamification.serializers import DriverAchievementSerializer
        data['achievements'] = DriverAchievementSerializer(achievements, many=True).data

        return Response(data)


class DriverVsDriverView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, nickname1, nickname2):
        try:
            d1 = DriverProfile.objects.get(nickname__iexact=nickname1)
            d2 = DriverProfile.objects.get(nickname__iexact=nickname2)
        except DriverProfile.DoesNotExist:
            return Response({'detail': 'One or both drivers not found.'}, status=status.HTTP_404_NOT_FOUND)

        from races.models import RaceResult

        # Find races both drivers competed in
        d1_race_ids = set(RaceResult.objects.filter(driver=d1).values_list('race_id', flat=True))
        d2_race_ids = set(RaceResult.objects.filter(driver=d2).values_list('race_id', flat=True))
        shared_race_ids = d1_race_ids & d2_race_ids

        if not shared_race_ids:
            return Response({
                'driver1': PublicDriverProfileSerializer(d1).data,
                'driver2': PublicDriverProfileSerializer(d2).data,
                'shared_races': 0,
                'message': 'These drivers have not competed against each other yet.',
            })

        d1_results = RaceResult.objects.filter(driver=d1, race_id__in=shared_race_ids)
        d2_results = RaceResult.objects.filter(driver=d2, race_id__in=shared_race_ids)

        # Head-to-head wins (lower position = better)
        d1_wins = sum(
            1 for race_id in shared_race_ids
            if (r1 := d1_results.filter(race_id=race_id).first()) and
               (r2 := d2_results.filter(race_id=race_id).first()) and
               not r1.dnf and (r2.dnf or r1.position < r2.position)
        )
        d2_wins = sum(
            1 for race_id in shared_race_ids
            if (r1 := d1_results.filter(race_id=race_id).first()) and
               (r2 := d2_results.filter(race_id=race_id).first()) and
               not r2.dnf and (r1.dnf or r2.position < r1.position)
        )

        d1_stats = d1_results.aggregate(
            avg_position   = __import__('django.db.models', fromlist=['Avg']).Avg('position'),
            total_points   = Sum('points_awarded'),
            fastest_laps   = Count('id', filter=Q(fastest_lap=True)),
            podiums        = Count('id', filter=Q(position__lte=3, dnf=False)),
        )
        d2_stats = d2_results.aggregate(
            avg_position   = __import__('django.db.models', fromlist=['Avg']).Avg('position'),
            total_points   = Sum('points_awarded'),
            fastest_laps   = Count('id', filter=Q(fastest_lap=True)),
            podiums        = Count('id', filter=Q(position__lte=3, dnf=False)),
        )

        return Response({
            'driver1': {
                **PublicDriverProfileSerializer(d1).data,
                'h2h_wins':       d1_wins,
                'shared_points':  d1_stats['total_points'] or 0,
                'avg_position':   round(d1_stats['avg_position'] or 0, 2),
                'fastest_laps':   d1_stats['fastest_laps'],
                'podiums':        d1_stats['podiums'],
            },
            'driver2': {
                **PublicDriverProfileSerializer(d2).data,
                'h2h_wins':       d2_wins,
                'shared_points':  d2_stats['total_points'] or 0,
                'avg_position':   round(d2_stats['avg_position'] or 0, 2),
                'fastest_laps':   d2_stats['fastest_laps'],
                'podiums':        d2_stats['podiums'],
            },
            'shared_races': len(shared_race_ids),
            'verdict': d1.nickname if d1_wins > d2_wins else (d2.nickname if d2_wins > d1_wins else 'Tied'),
        })


class LeaderboardView(generics.ListAPIView):
    serializer_class   = LeaderboardEntrySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        scope = self.request.query_params.get('scope', 'global')
        if scope == 'monthly':
            from races.models import RaceResult
            start = now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            monthly_pts = (
                RaceResult.objects.filter(driver=OuterRef('pk'), created_at__gte=start)
                .values('driver')
                .annotate(pts=Sum('points_awarded'))
                .values('pts')
            )
            return DriverProfile.objects.annotate(
                monthly_points=Subquery(monthly_pts[:1])
            ).order_by(F('monthly_points').desc(nulls_last=True))
        return DriverProfile.objects.order_by('-total_points')
