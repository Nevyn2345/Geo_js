from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext, loader
import json
from django.core.serializers.json import DjangoJSONEncoder
from .models import City
from django.forms.models import model_to_dict
from django.conf import settings
import random, logging
from PIL import Image
import os
import base64
import cStringIO

img = Image.open(settings.STATIC_PATH + 'geogame/big_map.jpg')
img.load()

def index(request):
    a = random.randrange(0,23000)
    location = City.objects.get(pk=7)
    location = model_to_dict(location)
    location_json = json.dumps(location, cls=DjangoJSONEncoder)
    context = RequestContext(request, {'location': location_json})
    template = loader.get_template('geogame/main.html')
    return HttpResponse(template.render(context))


def next_city(request):
    cities = 23000
    difficulty = int(request.GET.get('difficulty', ''))
    number = cities+1
    while number > cities:
        number = abs(int(random.gauss(difficulty, 50)))
    location = City.objects.get(pk=number)
    location = model_to_dict(location)
    return JsonResponse(location)

def test(request):
    #img = Image.open(settings.STATIC_PATH + 'geogame/big_map.jpg')
    #img.load()
    xpos = int(request.GET.get('xpos', ''))
    ypos = int(request.GET.get('ypos', ''))
    upper = ypos*10 - 300
    left = xpos*10 - 600
    right = xpos*10 + 600
    lower = ypos*10 + 300
    cropped_img = img.crop((left, upper, right, lower))
    buffer = cStringIO.StringIO()
    cropped_img.save(buffer, format = "JPEG")
    img_str = base64.b64encode(buffer.getvalue())
    return HttpResponse(img_str)
