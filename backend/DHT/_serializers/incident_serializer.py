from rest_framework import serializers
from ..models import Incident, User

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
            model = Incident
            fields = '__all__'

class ResolveIncidentSerializer(serializers.ModelSerializer):
      resolver = serializers.PrimaryKeyRelatedField(
            queryset=User.objects.all(),
            required=True
      )
      class Meta:
            model = Incident
            fields = ['resolver']