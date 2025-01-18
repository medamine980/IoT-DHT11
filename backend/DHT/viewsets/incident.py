from ..models import Incident
from ..serializers import IncidentSerializer, ResolveIncidentSerializer
from ..authentication.csrf_exempt_session_authentication import CsrfExemptSessionAuthentication
from rest_framework import status, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.authentication import BasicAuthentication 


class IncidentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin, 
    GenericViewSet
):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

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

    @action(methods=['PATCH', 'GET'], detail=True, serializer_class=ResolveIncidentSerializer)
    def resolve(self, request, pk):
        instance = self.get_object()
        if request.method == 'GET':
            return Response(self.serializer_class(instance).data)
        instance.status = 1
        request.data['resolver'] = request.user.id
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.error_messages)
        return Response(self.serializer_class(instance).data, status=200)

   