# Generated by Django 5.2 on 2025-04-03 17:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Medium',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('add_date', models.DateField(auto_now_add=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('rating', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('status', models.CharField(choices=[('pending', 'Pendiente'), ('following', 'Siguiendo'), ('reading', 'Leyendo'), ('watched', 'Vista'), ('upcoming', 'Pendiente de salida'), ('pending_purchase', 'Pendiente de compra'), ('playing', 'Jugando'), ('finished', 'Terminado')], default='active', max_length=20)),
                ('category', models.CharField(choices=[('movie', 'Película'), ('series', 'Serie'), ('novel', 'Novela'), ('game', 'Juego'), ('anime', 'Anime'), ('manga', 'Manga')], default='movie', max_length=20)),
            ],
        ),
    ]
