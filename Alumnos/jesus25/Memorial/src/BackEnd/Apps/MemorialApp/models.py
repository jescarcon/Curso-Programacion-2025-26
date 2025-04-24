from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

import os
from django.core.exceptions import ValidationError
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

class User(AbstractUser):
    avatar = models.ImageField(blank=True, null=True , default='images/user/default_user.jpg')  
        

class Medium(models.Model):
    class STATUS_CHOICES(models.TextChoices):
        #Variable=DDBB, UI
        PENDING="pending","Pendiente" ,
        FOLLOWING="following","Siguiendolo/a",
        READING="reading","Leyendolo/a",
        WATCHED="watched","Visto/a",
        UPCOMING="upcoming","Pendiente de Salida",
        PENDING_PURCHASE="pending_purchase","Pendiente de Compra",
        PLAYING="playing","Jugándolo/a",
        FINISHED="finished","Terminado/a",

    class CATEGORY_CHOICES(models.TextChoices):
        SERIE= "serie","Serie"
        FILM= "film","Pelicula"
        NOVEL= "novel","Novela"
        ANIME= "anime","Anime"
        MANGA= "manga","Manga"
        GAME= "game","Juego"

    title=models.CharField(max_length=255)
    description=models.TextField(blank=True,null=True)
    add_date=models.DateField(auto_now_add=True)
    image=models.ImageField(upload_to='images/media',blank=True,null=True) #Imagen modificable por defecto una de BOT
    rating=models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ]
        )
    
    status=models.CharField(max_length=20,choices=STATUS_CHOICES)
    category=models.CharField(max_length=10,choices=CATEGORY_CHOICES)

    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='media')

    # Cambiar el nombre de la clase en singular y plural
    class Meta:
        verbose_name = "Medium"  # Nombre singular
        verbose_name_plural = "Media"  # Nombre plural


class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/note',blank=True, null=True)

    medium = models.ForeignKey(Medium, on_delete=models.CASCADE, related_name='notes')



# Función para eliminar las imágenes asociadas al objeto cuando se elimina
@receiver([post_delete], sender=Medium)
@receiver([post_delete], sender=Note)
def delete_image(sender, instance, **kwargs):
    # Verifica si la instancia tiene una imagen asociada
    if instance.image:
        # Si existe una imagen, verifica si el archivo realmente existe en el sistema de archivos
        if os.path.isfile(instance.image.path):
            # Si el archivo existe, se elimina físicamente
            os.remove(instance.image.path)

# Función para eliminar la imagen anterior antes de guardar la nueva
@receiver(pre_save, sender=Medium)
@receiver(pre_save, sender=Note)
def delete_old_image(sender, instance, **kwargs):
    if instance.pk:  # Verifica si la instancia ya existe en la base de datos (es una actualización)
        old_instance = sender.objects.get(pk=instance.pk)
        if old_instance.image != instance.image:  # Si la imagen ha cambiado
            # Elimina la imagen anterior si existe
            if old_instance.image:
                if os.path.isfile(old_instance.image.path):
                    os.remove(old_instance.image.path)

# Si quieres hacer más validaciones sobre las imágenes, puedes agregar un validador en el campo de imagen:
def validate_image(value):
    # Verifica si el nombre del archivo de la imagen termina en uno de los formatos permitidos
    if not value.name.endswith(('.jpg', '.jpeg', '.png')):
        # Si no es un formato válido, lanza un error de validación
        raise ValidationError("Solo se permiten imágenes en formato JPG o PNG.")