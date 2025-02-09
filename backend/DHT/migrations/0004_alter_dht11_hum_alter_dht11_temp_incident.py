# Generated by Django 5.1.2 on 2025-01-06 11:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DHT', '0003_alter_user_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dht11',
            name='hum',
            field=models.FloatField(default=-1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='dht11',
            name='temp',
            field=models.FloatField(default=-1),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temp', models.FloatField()),
                ('hum', models.FloatField()),
                ('dt', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[(0, 'Non résolu'), (1, 'Résolu')], default=0, max_length=25)),
                ('resolver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
