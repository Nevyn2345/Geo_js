from django.db import models

class City(models.Model):
    name = models.CharField(max_length=50)
    uniqueID = models.IntegerField(default=0)
    ycoord = models.IntegerField(default=0)
    xcoord = models.IntegerField(default=0)
    country = models.CharField(max_length=50)
    population = models.IntegerField(default=0)
    times_played = models.IntegerField(default=0)
    average_distance = models.FloatField(default=0)
    difficulty_rating = models.FloatField(default=0)

    def __unicode__(self):
        return self.name
