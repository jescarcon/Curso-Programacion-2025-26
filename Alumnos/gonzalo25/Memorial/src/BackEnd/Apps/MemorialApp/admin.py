from django.contrib import admin
from .models import Medium
from .models import Note
from .models import User

# MEDIUM ADMIN
class MediumAdmin(admin.ModelAdmin):
    #añadir tods los campos
    list_display = ('title', 'description', 'add_date', 'rating', 'status', 'category')    #añadir los campos que se pueden editar
    search_fields = ['title', 'add_date', 'rating', 'status', 'category']    #añadir los campos que se pueden buscar

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'add_date')
    search_fields = ['title', 'description']

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'avatar')
    search_fields = ['id', 'username', 'email']

admin.site.register(Medium, MediumAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(User, UserAdmin)