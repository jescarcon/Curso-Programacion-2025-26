from rest_framework import serializers
from .models import Medium,Note,User

#--------------Note--------------
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id',
                  'title', 
                  'description',
                  'add_date',
                  'image',
                  'medium',
                ]

#--------------Medium--------------
class MediumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medium
        fields = ['id', 'title', 'description', 
                  'add_date','image','rating',
                  'status','category','user']
        
#--------------User--------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'avatar']
