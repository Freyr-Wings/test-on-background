# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-03-02 13:52
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ssd', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='listofquestions',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=[]),
            preserve_default=False,
        ),
    ]