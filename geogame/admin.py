from django.contrib import admin

from .models import City

class CityAdmin(admin.ModelAdmin):
    fieldsets = [
        ('City', {'fields': ['name']}),
        ('Information', {'fields': ['country', 'population',  'xPosition', 'yPosition', 'times_played', 'average_distance', 'difficulty_rating']})
    ]

    list_display = ('name', 'times_played', 'average_distance', 'difficulty_rating')

admin.site.register(City, CityAdmin)
