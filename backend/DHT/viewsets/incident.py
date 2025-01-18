from ..models import Incident
from ..serializers import IncidentSerializer, ResolveIncidentSerializer
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

    def get_permissions(self):
        if self.action in ['resolve']:
            return [IsAuthenticated()]
        return [AllowAny()]

    # @action(methods=['GET'], detail=False, serializer_class=ResolveIncidentSerializer)
    # def resolve(self, request, pk):
    #     instance = self.get_object()
    #     instance.status = 1
    #     pass

    @action(['GET'], url_path='last-incident', detail=False)
    def last_data(self, request):
        last_record = Incident.objects.filter(
            status=0
        ).last()
        if last_record is None:
            return Response({ "message": "There is no incident"}, status=404)
        data_ser = IncidentSerializer(last_record)
        return Response(data_ser.data, status=200)

    @action(methods=['PUT', 'GET'], detail=True, serializer_class=ResolveIncidentSerializer)
    def resolve(self, request, pk):
        instance = self.get_object()
        if request.method == 'GET':
            return Response(self.serializer_class(instance).data)
        instance.status = 1
        instance.resolver = request.user.id
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(self.serializer_class(instance).data, status=203)

   