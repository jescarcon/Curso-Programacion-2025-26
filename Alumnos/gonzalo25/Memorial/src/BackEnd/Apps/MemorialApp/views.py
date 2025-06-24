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


#2FA
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseServerError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def enviar_correo(request):
    email_destino = request.user.email
    if not email_destino:
        return HttpResponse("El usuario no tiene un correo electrónico registrado.")
    
    try:
        send_mail(
            subject='Asunto del correo',
            message='Hola, este es un mensaje enviado desde Django.',
            from_email='gonzalogarciaprieto.275@gmail.com',
            recipient_list=['ggarpri290@ieslucussolis.es'],
            fail_silently=False,
        )
        return HttpResponse("Correo enviado correctamente.")
    except Exception as e:
        return HttpResponseServerError(f"Error enviando correo: {e}")