# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('uniqueID', models.IntegerField(default=0)),
                ('xPosition', models.IntegerField(default=0)),
                ('yPosition', models.IntegerField(default=0)),
                ('country', models.CharField(max_length=50)),
                ('population', models.IntegerField(default=0)),
                ('times_played', models.IntegerField(default=0)),
                ('average_distance', models.FloatField(default=0)),
                ('difficulty_rating', models.FloatField(default=0)),
            ],
        ),
    ]
