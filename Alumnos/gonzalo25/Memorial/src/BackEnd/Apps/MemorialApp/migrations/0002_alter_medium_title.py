# Generated by Django 5.2 on 2025-07-01 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MemorialApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medium',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
