from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

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
    image = models.ImageField(blank=True, null=True)
    rating = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ]
        
    )
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True)
