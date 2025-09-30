from django.db import models
from django.contrib.auth.models import User
import datetime

class CoupleGroup(models.Model):
    user1 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='couple_user1'
    )

    user2 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='couple_user2'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user1.username} ❤️ {self.user2.username}"

class Album(models.Model):
    couple = models.ForeignKey(
        CoupleGroup, on_delete=models.CASCADE, related_name='albums'
    )
    year = models.PositiveIntegerField(default=datetime.date.today().year)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.couple} - {self.year}'

class Memory(models.Model):
    SPECIAL_DAYS = [
        ('BIRTHDAY', 'Birthday'),
        ('ANNIVERSARY', 'Anniversary'),
        ('VALENTINE', 'valentine\'s Day'),
        ('NEWYEAR', 'New Year'),
        ('NONE', 'None')
    ]
    
    album = models.ForeignKey("Album", on_delete=models.CASCADE, related_name='memories')
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/%Y/%m/')
    special_day = models.CharField(
        max_length=20,
        choices=SPECIAL_DAYS,
        default='NONE'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name