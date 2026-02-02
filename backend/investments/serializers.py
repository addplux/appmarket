from rest_framework import serializers
from .models import Investment, Interest

class InvestmentSerializer(serializers.ModelSerializer):
    investor = serializers.ReadOnlyField(source='investor.username')

    class Meta:
        model = Investment
        fields = '__all__'

class InterestSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Interest
        fields = '__all__'
