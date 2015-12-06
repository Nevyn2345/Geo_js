#from geogame.models import City
#import sys

#sys.path.append('/Users/sam/Documents/code/python/geojs2')
#from django.core import management
#from mygame import settings

#management.setup_environ(settings)

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mygame.settings")
from geogame.models import City

f = open("data_load.txt", 'r').readlines()

i = 1

string = "["
for line in f:
    line = line.strip('\n')
    line = line.split('\t')
    #line = [unicode(each,'utf8') for each in line] #iso8859-1
    line[6] = 1
    line[7] = 100
    print line
    c = City(id = i,name=line[1], uniqueID=i, xcoord=int(line[3]), ycoord=int(line[2]), country=line[4], population=line[5], times_played=line[6], average_distance=line[7], difficulty_rating=line[8])

    c.save()
    #string+= "{ \"model\": \"geogame.City\", \"pk\": "+str(i)+", \"fields\": { \"name\": \""+line[1]+"\", \"xPosition\": \""+line[2]+"\", \"yPosition\": \""+line[3]+"\", \"country\": \""+line[4]+"\", \"population\": \""+line[5]+"\", \"times_played\": \"1\", \"average_distance\": \"100\", \"difficulty_rating\": \""+line[8]+"\" } }, "
    i+=1
#string+="]"
#sys.stdout.write(string)
