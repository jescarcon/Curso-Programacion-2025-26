from rest_framework import serializers
from .models import Medium
from .models import Note

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
                ]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id',
                  'title', 
                  'description',
                  'add_date',
                  'image',
                ]
