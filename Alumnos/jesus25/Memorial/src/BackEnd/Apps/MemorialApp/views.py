from rest_framework import viewsets
from .models import Medium,Note
from .serializers import MediumSerializer,NoteSerializer
#---------------------MEDIUM VIEWSET---------------------
class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
