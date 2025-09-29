from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoupleGroupViewSet, AlbumViewSet, UserViewSet, UserRegistrationViewSet

router = DefaultRouter()
router.register(r'couples', CoupleGroupViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'users', UserViewSet)
router.register(r'register', UserRegistrationViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
]