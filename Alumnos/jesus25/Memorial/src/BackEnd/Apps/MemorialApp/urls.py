from rest_framework.routers import DefaultRouter
from .views import MediumViewSet
from django.urls import path,include


router = DefaultRouter()
router.register(r'media', MediumViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
