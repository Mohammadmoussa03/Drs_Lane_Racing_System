"""
All transactional email senders for the users app.
Each function is self-contained — call it anywhere, it handles everything.
"""
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

from users.models import EmailVerificationToken, PasswordResetToken


def send_verification_email(user):
    """Create (or replace) a verification token and email it to the user."""
    EmailVerificationToken.objects.filter(user=user).delete()
    token_obj = EmailVerificationToken.objects.create(user=user)

    verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token_obj.token}"

    subject = "DRS Lane — Verify your email address"
    message = (
        f"Welcome to DRS Lane, {user.username}!\n\n"
        f"Click the link below to verify your email address:\n{verify_url}\n\n"
        f"This link expires in {settings.EMAIL_VERIFICATION_EXPIRY_HOURS} hours.\n\n"
        f"If you did not create an account, ignore this email."
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)


def send_password_reset_email(user):
    """Create a password reset token and email the reset link."""
    token_obj = PasswordResetToken.objects.create(user=user)

    reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token_obj.token}"

    subject = "DRS Lane — Password reset request"
    message = (
        f"Hi {user.username},\n\n"
        f"Click the link below to reset your password:\n{reset_url}\n\n"
        f"This link expires in {settings.PASSWORD_RESET_EXPIRY_HOURS} hours and can only be used once.\n\n"
        f"If you did not request a password reset, ignore this email."
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)


def send_waitlist_promoted_email(driver, race):
    """Notify a driver that they've been promoted off the waitlist."""
    subject = f"DRS Lane — You're in! {race.title}"
    message = (
        f"Great news, {driver.nickname}!\n\n"
        f"A slot has opened in '{race.title}' scheduled for "
        f"{race.scheduled_at.strftime('%A %d %B %Y at %H:%M UTC')}.\n\n"
        f"Your booking has been automatically confirmed.\n"
        f"Log in to your dashboard to view your upcoming races.\n\n"
        f"See you on the grid!"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [driver.user.email], fail_silently=True)
