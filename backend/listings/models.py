from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Listing(models.Model):
    CATEGORY_CHOICES = (
        ('app', 'Emerging App'),
        ('hotel', 'Hotel'),
        ('lodge', 'Lodge'),
        ('apartment', 'Apartment'),
        ('university', 'University'),
        ('college', 'College'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('active', 'Active'),
        ('rejected', 'Rejected'),
    )
    
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='listings')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='listings')
    title = models.CharField(max_length=255)
    description = models.TextField()
    how_it_works = models.TextField(blank=True, help_text="Detailed explanation of how the app/service works")
    
    # Images & Media
    image = models.ImageField(upload_to='listings/', blank=True, null=True, help_text="Main cover image")
    logo = models.ImageField(upload_to='listings/logos/', blank=True, null=True, help_text="App icon or logo")
    video_url = models.URLField(blank=True, help_text="Link to a demo video (e.g., YouTube)")
    external_link = models.URLField(blank=True, help_text="Link to download app or visit website")
    apk_file = models.FileField(upload_to='listings/apks/', blank=True, null=True, help_text="Upload APK file for direct download")
    
    # Details
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Price in USD (0 for free)")
    features = models.TextField(blank=True, help_text="Key features (one per line)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class ListingScreenshot(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='screenshots')
    image = models.ImageField(upload_to='listings/screenshots/')
    caption = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Screenshot for {self.listing.title}"
