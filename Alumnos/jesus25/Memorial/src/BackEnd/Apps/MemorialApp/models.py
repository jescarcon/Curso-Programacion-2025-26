from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

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
