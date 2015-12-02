# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geogame', '0001_initial'),
    ]

    operations = [
        migrations.RenameField('City', 'xPosition', 'ycoord'),
        migrations.RenameField('City', 'yPosition', 'xcoord')
    ]
