from django.db import models

class Note(models.Model):
    name= models.TextField(max_length=15,blank=True,null=True)
    description= models.TextField(blank=True,null=True)