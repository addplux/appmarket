from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('investor', 'Investor'),
        ('partner', 'Partner'),
        ('regular', 'Regular User'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='regular')

    def __str__(self):
        return self.username
