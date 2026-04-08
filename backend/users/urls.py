from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import (
    RegisterView, VerifyEmailView, ResendVerificationView,
    PasswordResetRequestView, PasswordResetConfirmView,
    ProfileView, DriverMeView, LeaderboardView,
)

urlpatterns = [
    # Auth
    path('auth/register/',                RegisterView.as_view(),              name='register'),
    path('auth/login/',                   TokenObtainPairView.as_view(),        name='token_obtain_pair'),
    path('auth/refresh/',                 TokenRefreshView.as_view(),           name='token_refresh'),
    path('auth/logout/',                  TokenBlacklistView.as_view(),         name='token_blacklist'),
    path('auth/profile/',                 ProfileView.as_view(),                name='profile'),
    # Email verification
    path('auth/verify-email/',            VerifyEmailView.as_view(),            name='verify_email'),
    path('auth/resend-verification/',     ResendVerificationView.as_view(),     name='resend_verification'),
    # Password reset
    path('auth/password-reset/',          PasswordResetRequestView.as_view(),   name='password_reset_request'),
    path('auth/password-reset/confirm/',  PasswordResetConfirmView.as_view(),   name='password_reset_confirm'),
    # Driver
    path('drivers/me/',                   DriverMeView.as_view(),               name='driver_me'),
    path('drivers/leaderboard/',          LeaderboardView.as_view(),            name='leaderboard'),
]
