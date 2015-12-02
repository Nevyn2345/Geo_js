from django.core.management.base import BaseCommand
from geogame.models import City

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'populates database'

    def _create_db(self):
        tcity = City(name=
