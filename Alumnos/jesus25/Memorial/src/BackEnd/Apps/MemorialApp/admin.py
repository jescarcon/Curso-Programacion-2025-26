from django.contrib import admin
from .models import Medium,Note,User

#----------------MEDIUM ADMIN----------------
class MediumAdmin(admin.ModelAdmin):
    list_display=('title','description','add_date','image','rating','status','category')
    search_fields=('title','add_date','rating','status','category')

#----------------NOTE ADMIN----------------
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'add_date')
    search_fields = ['title', 'description']

#----------------USER ADMIN----------------
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'avatar')
    search_fields = ['username', 'first_name', 'last_name', 'email']


admin.site.register(User, UserAdmin)
admin.site.register(Medium, MediumAdmin)
admin.site.register(Note, NoteAdmin)