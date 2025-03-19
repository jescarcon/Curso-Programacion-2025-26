from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet): #GET POST PUT DELETE   o CRUD
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
