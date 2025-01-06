from ..models import Incident
from ..serializers import IncidentSerializer
from rest_framework import status, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

class IncidentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin, 
    GenericViewSet
):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

   