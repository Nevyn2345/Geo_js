from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
import json
from django.core.serializers.json import DjangoJSONEncoder
from .models import City
from django.forms.models import model_to_dict
import random

def index(request):
    a = random.randrange(0,23000)
    location = City.objects.get(pk=a)
    location = model_to_dict(location)
    location_json = json.dumps(location, cls=DjangoJSONEncoder)
    context = RequestContext(request, {'location': location_json})
    template = loader.get_template('geogame/main.html')
    return HttpResponse(template.render(context))
