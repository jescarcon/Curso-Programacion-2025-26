from rest_framework import serializers
from .models import Note, Medium
from .models import User

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id',
                  'title', 
                  'description',
                  'add_date',
                  'image',
                  'medium'
                ]
        
class MediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medium
        fields = ['id',
                  'title', 
                  'description',
                  'add_date',
                  'image',
                  'rating', 
                  'status', 
                  'category',
                  'user'
                ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id',
                  'username', 
                  'email',
                  'avatar'
                ]