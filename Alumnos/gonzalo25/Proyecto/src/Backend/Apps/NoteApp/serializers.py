from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['id','name', 'description']


#Esto hace que sobre el modelo Note yo voy a permitir que los campos que yo dicte (identicos a los del modelo) serán los que se enviarán como JSON al framework