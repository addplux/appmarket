from rest_framework import serializers
from .models import Investment

class InvestmentSerializer(serializers.ModelSerializer):
    investor = serializers.ReadOnlyField(source='investor.username')

    class Meta:
        model = Investment
        fields = '__all__'
