from django.db import models

class CoupleGroup(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    

class Gallery(models.Model):
    SPECIAL_DAYS = [
        ('BIRTHDAY', 'Birthday'),
        # годовщина и тд
    ]
    
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/')
    special_day = models.CharField()