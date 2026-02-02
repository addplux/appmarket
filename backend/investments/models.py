from django.db import models
from django.conf import settings
from listings.models import Listing

class Investment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='investments')
    investor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='investments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Investment of {self.amount} in {self.listing.title}"

class Interest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('connected', 'Connected'),
        ('closed', 'Closed'),
    )

    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='interests')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='interests')
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Interest from {self.user.username} in {self.listing.title}"
