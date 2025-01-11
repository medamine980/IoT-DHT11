from ._serializers.login_serializer import LoginSerializer
from ._serializers.incident_serializer import IncidentSerializer, ResolveIncidentSerializer
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
    
    def create(self, validated_data):
        # Hash the password using set_password
        password = validated_data.pop('password', None)
        email = validated_data.pop('email', None)
        if password and email:
            user = self.Meta.model.objects.create_user(email=email, password=password, **validated_data)
            return user
        
    def update(self, instance, validated_data):
        return instance.objects.update_user(instance, **validated_data)

