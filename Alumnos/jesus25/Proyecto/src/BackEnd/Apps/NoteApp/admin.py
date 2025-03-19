from django.contrib import admin
from .models import Note
# Register your models here.
class NoteAdmin(admin.ModelAdmin):
    list_display=('name','description')
    search_fields=('name',)
    list_filter=('name',)

admin.site.register(Note,NoteAdmin)