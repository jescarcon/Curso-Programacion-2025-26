from rest_framework.routers import DefaultRouter
from django.urls import path,include
from .views import NoteViewSet

router=DefaultRouter()
router.register(r'notes',NoteViewSet)
#/routes
#/routes/id
#routescreate
#routesdelete
#routes...


urlpatterns=[
    path('', include(router.urls))
]