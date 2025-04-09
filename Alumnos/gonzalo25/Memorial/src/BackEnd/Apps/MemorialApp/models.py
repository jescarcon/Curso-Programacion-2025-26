from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    avatar = models.ImageField(upload_to='images/avatar', blank=True, null=True, default='images/user/user_default.png') #Puede estar en blanco o ser nulo

class Medium(models.Model):
    class STATUS_CHOICES(models.TextChoices):
        PENDING = 'pending', 'Pendiente' #variable = BBDD, UI
        FOLLOWING = 'following', 'Siguiendo'
        READING = 'reading', 'Leyendo'
        WATCHED = 'watched', 'Vista'
        UPCOMING = 'upcoming', 'Pendiente de salida'
        PENDING_PURCHASE = 'pending_purchase', 'Pendiente de compra'
        PLAYING = 'playing', 'Jugando'
        FINISHED = 'finished', 'Terminado'

    class CATEGORY_CHOICES(models.TextChoices):
        MOVIE = 'movie', 'Película'
        SERIES = 'series', 'Serie'
        NOVEL = 'novel', 'Novela'
        GAME = 'game', 'Juego'
        ANIME = 'anime', 'Anime'
        MANGA = 'manga', 'Manga'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/media', blank=True, null=True)
    rating = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ]
        
    )
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    #Cuando se borra un usuario, se borran los medios asociados a ese usuario
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='media')

    class Meta:
        verbose_name = 'Medium'
        verbose_name_plural = 'Media'

class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/note', blank=True, null=True)

    #Cuando se borra un medio, se borran las notas asociadas a ese medio
    medium=models.ForeignKey(Medium, on_delete=models.CASCADE, related_name='notes')
