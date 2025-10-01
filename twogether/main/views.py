from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CoupleGroup, Album, CustomUser
from .serializers import CoupleGroupSerializer, AlbumSerializer, UserSerializer, RegistrationRequestSerializer, RegistrationConfirmSerializer

class CoupleGroupViewSet(viewsets.ModelViewSet):
    queryset = CoupleGroup.objects.all()
    serializer_class = CoupleGroupSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserRegistrationViewSet(viewsets.GenericViewSet):
    @action(detail=False, methods=['post'])
    def request(self, request):
        serializer = RegistrationRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Verification code sent to email'})
    
    @action(detail=False, methods=['post'])
    def confirm(self, request):
        serializer = RegistrationConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User created succesfully'})