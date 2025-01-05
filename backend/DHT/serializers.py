from rest_framework import serializers
from . import models

class DHT11serialize(serializers.ModelSerializer):
    class Meta:
            model = models.DHT11
            fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
            model = models.User
            fields = '__all__'

