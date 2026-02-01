from django.contrib import admin
from .models import Category, Listing, ListingScreenshot

class ListingScreenshotInline(admin.TabularInline):
    model = ListingScreenshot
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'owner', 'created_at', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
    inlines = [ListingScreenshotInline]

admin.site.register(ListingScreenshot)
