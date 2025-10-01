from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework import serializers
from main.models import CoupleGroup, Album, Memory, CustomUser, PendingUser
import random

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']

class RegistrationRequestSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match"})
        User = get_user_model()
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered"})
        return attrs

    def create(self, validated_data):
        code = str(random.randint(10000000, 99999999))
        pending_user = PendingUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password1']),
            code=code
        )

        send_mail(
            "Welcome to TwoGether 🎉",
            f"Here is your verification code: {code}",
            'myprojectsenderemails@gmail.com',
            [validated_data['email']],
            fail_silently=False
        )
        
        return pending_user
    
class RegistrationConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=8)

    def validate(self, attrs):
        try:
            pending_user = PendingUser.objects.get(email=attrs['email'], code=attrs['code'])
        except PendingUser.DoesNotExist:
            raise serializers.ValidationError("Invalid code or email")
        attrs['pending_user'] = pending_user
        return attrs
    
    def create(self, validated_data):
        pending_user = validated_data['pending_user']
        User = get_user_model()
        user = User.objects.create(
            username=pending_user.username,
            email=pending_user.email,
            password=pending_user.password
        )
        pending_user.delete()
        return user


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CoupleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoupleGroup
        fields = ['id', 'user1', 'user2', 'created_at']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['couple', 'year', 'created']