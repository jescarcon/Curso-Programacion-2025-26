from rest_framework import viewsets
from .models import Medium
from .serializers import MediumSerializer

#---------------------MEDIUM VIEWSET---------------------
class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer