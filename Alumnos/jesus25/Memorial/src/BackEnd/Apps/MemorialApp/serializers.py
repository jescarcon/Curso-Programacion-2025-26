from rest_framework import serializers
from .models import Medium,Note

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


class MediumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medium
        fields = ['id', 'title', 'description', 
                  'add_date','image','rating',
                  'status','category','user']