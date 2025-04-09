from django.shortcuts import render
from rest_framework import viewsets
from .models import Medium, Note, User
from .serializers import MediumSerializer, NoteSerializer, UserSerializer
# Create your views here.

class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer