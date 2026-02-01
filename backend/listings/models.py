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
    
    created_at = models.DateTimeField(auto_now_add=True)
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
