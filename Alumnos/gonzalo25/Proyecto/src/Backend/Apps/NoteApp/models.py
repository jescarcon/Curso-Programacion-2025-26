from django.db import models

# Create your models here.
class Note(models.Model):
    name=models.TextField(max_length=30,blank=True,null=True)
    description=models.TextField(max_length=300,blank=True,null=True)
    #number=models.IntegerField(max=5,blank=True,null=True)
        #max=(número máximo)

    #imagen=models.ImageField(upload_to="images/notes") #Se guardaría en Media/images/notes
