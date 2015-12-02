from geogame.models import City
import sys

f = open("sorted_by_diff.txt", 'r').readlines()

i = 1

string = "["
for line in f:
    line = line.strip('\n')
    line = line.split('\t')
    line = [unicode(each,'iso8859-1') for each in line]
    line[6] = 1
    line[7] = 100
    #print line
    c = City(name=line[1], uniqueID=i, xPosition=int(line[2]), yPosition=int(line[3]), country=line[4], population=line[5], times_played=line[6], average_distance=line[7], difficulty_rating=line[8])
    c.save()
    #string+= "{ \"model\": \"geogame.person\", \"pk\": "+str(i)+", \"fields\": { \"name\": \""+line[1]+"\", \"xPosition\": \""+line[2]+"\", \"yPosition\": \""+line[3]+"\", \"country\": \""+line[4]+"\", \"population\": \""+line[5]+"\", \"times_played\": \"1\", \"average_distance\": \"100\", \"difficulty_rating\": \""+line[8]+"\" } }, "
    i+=1
#string+="]"
#sys.stdout.write(string)
