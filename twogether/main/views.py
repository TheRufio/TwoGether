from rest_framework import viewsets
from .models import CoupleGroup, Album
from .serializers import CoupleGroupSerializer, AlbumSerializer

class CoupleGroupViewSet(viewsets.ModelViewSet):
    queryset = CoupleGroup.objects.all()
    serializer_class = CoupleGroupSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer