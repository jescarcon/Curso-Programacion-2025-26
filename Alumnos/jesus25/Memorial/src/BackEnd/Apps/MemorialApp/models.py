from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator

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
    image=models.URLField(blank=True,null=True) #Imagen modificable por defecto una de BOT
    rating=models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ]
        )
    
    status=models.CharField(max_length=20,choices=STATUS_CHOICES)
    category=models.CharField(max_length=10,choices=CATEGORY_CHOICES)
