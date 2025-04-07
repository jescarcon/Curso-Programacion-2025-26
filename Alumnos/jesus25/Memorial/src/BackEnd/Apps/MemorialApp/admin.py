from django.contrib import admin
from .models import Medium,Note

#----------------MEDIUM ADMIN----------------
class MediumAdmin(admin.ModelAdmin):
    list_display=('title','description','add_date','image','rating','status','category')
    search_fields=('title','add_date','rating','status','category')

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'add_date')
    search_fields = ['title', 'description']


admin.site.register(Medium, MediumAdmin)
admin.site.register(Note, NoteAdmin)