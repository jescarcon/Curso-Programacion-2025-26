from rest_framework.routers import DefaultRouter
from .views import MediumViewSet
from .views import NoteViewSet
from django.urls import path, include


router = DefaultRouter()
router.register(r'media', MediumViewSet)
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]