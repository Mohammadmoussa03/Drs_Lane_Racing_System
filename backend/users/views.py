from django.db.models import F, Sum, Subquery, OuterRef
from django.utils.timezone import now
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import DriverProfile, EmailVerificationToken, PasswordResetToken
from .serializers import (
    RegisterSerializer, DriverProfileSerializer, LeaderboardEntrySerializer,
    PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
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
