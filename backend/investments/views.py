from rest_framework import viewsets, permissions
from .models import Investment, Interest
from .serializers import InvestmentSerializer, InterestSerializer

class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(investor=self.request.user)

class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        # If the user is a creator, they should see interests in their listings
        if hasattr(user, 'user_type') and user.user_type in ['app_creator', 'hospitality', 'university']:
            return Interest.objects.filter(listing__owner=user)
        # Otherwise, users (investors/individuals) see their own interests
        return Interest.objects.filter(user=user)
