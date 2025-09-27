from django.contrib.auth.models import Group, User
from rest_framework import serializers
from main.models import CoupleGroup

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'couple_groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CoupleGroupSerializer(serializers.ModelSerializer):
    days_together = serializers.SerializerMethodField()

    class Meta:
        model = CoupleGroup
        fields = ['id', 'name', 'users', 'start_date', 'days_together']

    def get_days_together(self, obj):
        return obj.days_together()