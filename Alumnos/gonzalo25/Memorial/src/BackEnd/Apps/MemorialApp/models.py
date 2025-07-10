from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, ValidationError
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import os
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from django.utils import timezone

# Validación personalizada para imágenes
def validate_image(value):
    if not value.name.endswith(('.jpg', '.png', '.jpeg', 'gif')):
        raise ValidationError("Solo son permitidos los ficheros de imagen de tipo jpg , png, jpeg o gif.")

# Modelo personalizado de usuario
class User(AbstractUser):
    avatar = models.CharField(max_length=500)
    two_factor_enabled = models.BooleanField(default=False)

    two_fa_code = models.CharField(max_length=6, blank=True, null=True)
    two_fa_expiration = models.DateTimeField(blank=True, null=True)

    def clear_2fa_code(self):
        self.two_fa_code = ''
        self.two_fa_expiration = None
        self.save()

# Modelo Medium (película, serie, etc.)
class Medium(models.Model):
    class STATUS_CHOICES(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        FOLLOWING = 'following', 'Siguiendo'
        READING = 'reading', 'Leyendo'
        WATCHED = 'watched', 'Vista'
        UPCOMING = 'upcoming', 'Pendiente de salida'
        PENDING_PURCHASE = 'pending_purchase', 'Pendiente de compra'
        PLAYING = 'playing', 'Jugando'
        FINISHED = 'finished', 'Terminado'

    class CATEGORY_CHOICES(models.TextChoices):
        MOVIE = 'film', 'Película'
        SERIES = 'serie', 'Serie'
        NOVEL = 'novel', 'Novela'
        GAME = 'game', 'Juego'
        ANIME = 'anime', 'Anime'
        MANGA = 'manga', 'Manga'

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/media', blank=True, null=True, validators=[validate_image])
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(10)])
    begin_date = models.DateField('Fecha inicio', null=True, blank=True)
    finish_date = models.DateField('Fecha fin', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='media')

    class Meta:
        verbose_name = 'Medium'
        verbose_name_plural = 'Media'

class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    add_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='images/note', blank=True, null=True, validators=[validate_image])
    medium = models.ForeignKey(Medium, on_delete=models.CASCADE, related_name='notes')

@receiver(post_delete, sender=Medium)
@receiver(post_delete, sender=Note)
def delete_image_on_delete(sender, instance, **kwargs):
    if instance.image and hasattr(instance.image, 'path'):
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

@receiver(pre_save, sender=Medium)
@receiver(pre_save, sender=Note)
def delete_old_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        return  # No hace nada si es nuevo

    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_file = old_instance.image
    new_file = instance.image

    if old_file and old_file != new_file and hasattr(old_file, 'path'):
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
