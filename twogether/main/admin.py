from django.contrib import admin
from main.models import CustomUser, PendingUser

admin.site.register((CustomUser, PendingUser))