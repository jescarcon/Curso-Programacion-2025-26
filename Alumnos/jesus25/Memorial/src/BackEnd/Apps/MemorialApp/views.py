from rest_framework import viewsets
from .models import Medium,Note,User
from .serializers import MediumSerializer,NoteSerializer,UserSerializer


#---------------------MEDIUM VIEWSET---------------------
class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer


#---------------------MEDIUM VIEWSET---------------------

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


#---------------------USER VIEWSET---------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer