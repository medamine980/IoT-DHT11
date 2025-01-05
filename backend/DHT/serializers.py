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
            user.save()
            return user

