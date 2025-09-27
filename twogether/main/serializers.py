from django.contrib.auth.models import Group, User
from rest_framework import serializers
from main.models import CoupleGroup, Album, Memory

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'couple_groups']

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