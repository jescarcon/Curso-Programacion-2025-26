from django.shortcuts import render
from rest_framework import viewsets
from .models import Medium
from .models import Note
from .serializers import MediumSerializer
from .serializers import NoteSerializer
# Create your views here.

class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer