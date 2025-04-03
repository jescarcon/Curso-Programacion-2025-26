from rest_framework import serializers
from .models import Medium

class MediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medium
        fields = ['id', 'title', 'description', 
                  'add_date','image','rating',
                  'status','category',]
