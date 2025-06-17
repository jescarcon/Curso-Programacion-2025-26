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
                  'user',
                  'begin_date',
                  'finish_date'
                ]


#- USUARIO CUSTOM MEMORIAL -
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Cifra la contraseña correctamente
        user.save()
        return user
    
    #- Actualiza el usuario y cifra la contraseña si se proporciona -
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
##