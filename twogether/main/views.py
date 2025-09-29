from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import CoupleGroup, Album
from .serializers import CoupleGroupSerializer, AlbumSerializer, UserSerializer, UserRegistrationSerializer
from django.contrib.auth.models import User

class CoupleGroupViewSet(viewsets.ModelViewSet):
    queryset = CoupleGroup.objects.all()
    serializer_class = CoupleGroupSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]