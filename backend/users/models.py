from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('app_creator', 'App Creator'),
        ('hospitality', 'Hospitality Partner'),
        ('university', 'Educational Institution'),
        ('investor', 'Investor'),
        ('individual', 'Individual'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='individual')

    def __str__(self):
        return self.username
