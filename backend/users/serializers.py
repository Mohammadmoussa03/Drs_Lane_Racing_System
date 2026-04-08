from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import DriverProfile, PasswordResetToken

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, label='Confirm password')
    nickname  = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        model  = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password', 'password2', 'nickname')
        extra_kwargs = {'username': {'required': False}}

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('password2'):
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        if not attrs.get('username'):
            attrs['username'] = attrs['email'].split('@')[0]
        return attrs

    def validate_nickname(self, value):
        if DriverProfile.objects.filter(nickname__iexact=value).exists():
            raise serializers.ValidationError('Nickname already taken.')
        return value

    def create(self, validated_data):
        nickname = validated_data.pop('nickname')
        user = User.objects.create_user(
            email      = validated_data['email'],
            username   = validated_data['username'],
            first_name = validated_data.get('first_name', ''),
            last_name  = validated_data.get('last_name', ''),
            password   = validated_data['password'],
        )
        DriverProfile.objects.create(user=user, nickname=nickname)
        return user


class DriverProfileSerializer(serializers.ModelSerializer):
    email      = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name  = serializers.CharField(source='user.last_name', read_only=True)
    achievements_count = serializers.SerializerMethodField()

    class Meta:
        model  = DriverProfile
        fields = (
            'id', 'email', 'first_name', 'last_name', 'nickname', 'avatar', 'bio',
            'total_races', 'wins', 'podiums', 'fastest_laps', 'total_points',
            'rank', 'skill_tier', 'subscription', 'subscription_expires',
            'discount_pct', 'achievements_count', 'created_at',
        )
        read_only_fields = (
            'total_races', 'wins', 'podiums', 'fastest_laps', 'total_points',
            'rank', 'skill_tier', 'discount_pct', 'created_at',
        )

    def get_achievements_count(self, obj):
        return obj.achievements.count()


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model  = DriverProfile
        fields = ('id', 'nickname', 'avatar', 'total_points', 'wins', 'podiums', 'rank', 'skill_tier')


class PublicDriverProfileSerializer(serializers.ModelSerializer):
    achievements_count = serializers.SerializerMethodField()
    championships_count = serializers.SerializerMethodField()

    class Meta:
        model  = DriverProfile
        fields = (
            'id', 'nickname', 'avatar', 'bio',
            'total_races', 'wins', 'podiums', 'fastest_laps',
            'total_points', 'rank', 'skill_tier',
            'achievements_count', 'championships_count', 'created_at',
        )

    def get_achievements_count(self, obj):
        return obj.achievements.count()

    def get_championships_count(self, obj):
        return obj.championship_entries.count()


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token    = serializers.UUIDField()
    password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_token(self, value):
        try:
            token_obj = PasswordResetToken.objects.select_related('user').get(token=value, used=False)
        except PasswordResetToken.DoesNotExist:
            raise serializers.ValidationError('Invalid or already used reset token.')
        if token_obj.is_expired():
            raise serializers.ValidationError('Reset token has expired. Please request a new one.')
        self.context['token_obj'] = token_obj
        return value
