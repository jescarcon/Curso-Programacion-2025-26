from django.shortcuts import render
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):  #GET POST PUT DELETE o CRUD
    queryset=Note.objects.all()
    serializer_class=NoteSerializer