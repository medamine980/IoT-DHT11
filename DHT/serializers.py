from rest_framework import serializers
from . import models

class DHT11serialize(serializers.ModelSerializer):
    class Meta:
            model = models.DHT11
            fields = '__all__'