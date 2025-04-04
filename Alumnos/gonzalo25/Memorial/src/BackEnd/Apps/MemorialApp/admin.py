from django.contrib import admin
from .models import Medium
from .models import Note

# MEDIUM ADMIN
class MediumAdmin(admin.ModelAdmin):
    #añadir tods los campos
    list_display = ('title', 'description', 'add_date')
    #añadir los campos que se pueden editar
    search_fields = ['title', 'description']

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'add_date')
    search_fields = ['title', 'description']

admin.site.register(Medium, MediumAdmin)
admin.site.register(Note, NoteAdmin)