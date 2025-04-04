# Generated by Django 5.2 on 2025-04-03 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MemorialApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medium',
            name='category',
            field=models.CharField(choices=[('movie', 'Película'), ('series', 'Serie'), ('novel', 'Novela'), ('game', 'Juego'), ('anime', 'Anime'), ('manga', 'Manga')], max_length=20),
        ),
        migrations.AlterField(
            model_name='medium',
            name='status',
            field=models.CharField(choices=[('pending', 'Pendiente'), ('following', 'Siguiendo'), ('reading', 'Leyendo'), ('watched', 'Vista'), ('upcoming', 'Pendiente de salida'), ('pending_purchase', 'Pendiente de compra'), ('playing', 'Jugando'), ('finished', 'Terminado')], max_length=20),
        ),
    ]
