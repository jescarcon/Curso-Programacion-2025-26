from django.shortcuts import render
from rest_framework import viewsets
from .models import Medium, Note, User
from .serializers import MediumSerializer, NoteSerializer, UserSerializer
# Create your views here.

class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()
    serializer_class = MediumSerializer

    def perform_create(self, serializer):
        generate_ai = self.request.data.get('generate_ai_image', False)
        instance = serializer.save(user=self.request.user)

        if str(generate_ai).lower() == 'true':
            img_file = generar_imagen_con_replicate(instance.title)
            if img_file:
                instance.image.save(f"{instance.title}.png", img_file, save=True)



class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#generar imagen con ia
import replicate
import requests
from django.core.files.base import ContentFile

REPLICATE_API_TOKEN = "r8_2Ben9WWm4JgatblRef84E8xDlBUxgnl1ELq3B"
replicate_client = replicate.Client(api_token=REPLICATE_API_TOKEN)

def generar_imagen_con_replicate(titulo):
    prompt = f"Illustration of {titulo}, digital art"
    
    # Ejecuta un modelo público que genera imágenes, por ejemplo black-forest-labs/flux-schnell
    output = replicate_client.run(
        "black-forest-labs/flux-schnell",
        input={"prompt": prompt}
    )
    
    # output es una lista de FileOutput (archivos)
    if output and len(output) > 0:
        image_url = output[0].url  # o output[0] directamente si es URL
        
        # Descarga la imagen
        response = requests.get(image_url)
        if response.status_code == 200:
            return ContentFile(response.content)
    
    return None



#2FA
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseServerError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def enviar_correo(request):
    # email_destino = request.user.email
    # if not email_destino:
    #     return HttpResponse("El usuario no tiene un correo electrónico registrado.")
    
    # try:
    #     send_mail(
    #         subject='Asunto del correo',
    #         message='Hola, este es un mensaje enviado desde Django.',
    #         from_email='gonzalogarciaprieto.275@gmail.com',
    #         recipient_list=['ggarpri290@ieslucussolis.es'],
    #         fail_silently=False,
    #     )
    #     return HttpResponse("Correo enviado correctamente.")
    # except Exception as e:
    #     return HttpResponseServerError(f"Error enviando correo: {e}")
    return 0