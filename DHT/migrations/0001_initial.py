# Generated by Django 5.1.2 on 2024-10-24 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DHT11',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temp', models.FloatField(null=True)),
                ('hum', models.FloatField(null=True)),
                ('dt', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
