from django.contrib import admin
from .models import Medium

#----------------MEDIUM ADMIN----------------
class MediumAdmin(admin.ModelAdmin):
    list_display=('title','description','add_date','image','rating','status','category')
    search_fields=('title','add_date','rating','status','category')


admin.site.register(Medium, MediumAdmin)