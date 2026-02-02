from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import UserViewSet
from users.auth_views import register_view, login_view, logout_view, current_user_view
from listings.views import CategoryViewSet, ListingViewSet
from ratings.views import RatingViewSet
from investments.views import InvestmentViewSet, InterestViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'investments', InvestmentViewSet)
router.register(r'interests', InterestViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # Authentication endpoints
    path('api/auth/register/', register_view, name='register'),
    path('api/auth/login/', login_view, name='login'),
    path('api/auth/logout/', logout_view, name='logout'),
    path('api/auth/me/', current_user_view, name='current-user'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
