from rest_framework import serializers
from .models import Category, Listing, ListingScreenshot

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ListingScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingScreenshot
        fields = ('id', 'image', 'caption')

class ListingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    screenshots = ListingScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = '__all__'
