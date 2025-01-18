import os
import csv
from ..models import DHT11, Incident
from ..serializers import DHT11serialize,IncidentSerializer
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from twilio.rest import Client
from ..alerts.whatsapp_alert import WhatsappAlert
from ..alerts.email_alert import EmailAlert
from ..alerts.telegram_alert import TelegramAlert
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse
from dotenv import load_dotenv

load_dotenv()


ALERT_TEMP = 25

TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TELEGRAM_API_KEY = os.getenv('TELEGRAM_API_KEY')
TELEGRAM_USER_ID = os.getenv('TELEGRAM_USER_ID')

whatsapp_alert = WhatsappAlert(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    )
email_alert = EmailAlert(['benali.medamine2002@gmail.com'])

telegram_alert = TelegramAlert(TELEGRAM_API_KEY, TELEGRAM_USER_ID)

# DHT11.objects.all().delete()

def d_list(request):
    if request.method == 'GET':
        all_data = DHT11.objects.all()
        data_ser = DHT11serialize(all_data, many=True)
        return Response(data_ser.data)
    elif request.method == 'POST':
        serial = DHT11serialize(data=request.data)

        if serial.is_valid():
            serial.save()
            temp = DHT11.objects.last().temp
            if temp > ALERT_TEMP:
#                 whatsapp_alert.send_message('Il y a une alerte importante sur votre Capteur\
# la température dépasse le seuil')
                # email_alert.send_mail('TEMP', f'La température dépasse le seuil de {ALERT_TEMP}°C, Veuillez intervenir immédiatement pour vérifier et corriger cette situation')
                telegram_alert.send_message(f'La température dépasse le seuil de {ALERT_TEMP}°C ,Veuillez intervenir immédiatement pour vérifier et corriger cette situation')
            return Response(serial.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serial.data, status=status.HTTP_400_BAD_REQUEST)



class DHTViewSet(ModelViewSet):
    queryset = DHT11.objects.all()
    serializer_class = DHT11serialize

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            temp = DHT11.objects.last().temp
            if temp > ALERT_TEMP:
                # whatsapp_alert.send_message('Il y a une alerte importante sur votre Capteura température dépasse le seuil')
                # email_alert.send_mail('TEMP', f'La température dépasse le seuil de {ALERT_TEMP}°C, Veuillez intervenir immédiatement pour vérifier et corriger cette situation')
                telegram_alert.send_message(f'La température dépasse le seuil de {ALERT_TEMP}°C ,Veuillez intervenir immédiatement pour vérifier et corriger cette situation')
                incident_serializer = IncidentSerializer(data=request.data)
                if incident_serializer.is_valid():
                    incident_serializer.save()

            else:
                last_incident = Incident.objects.filter(status=0).last()
                if last_incident is not None:
                    last_incident.status = 1    
                    last_incident.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_queryset(self):
        queryset = super().get_queryset()
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            try:
                queryset = queryset.filter(dt__range=[start_date, end_date])
            except ValueError:
                raise ValidationError({"detail": "Invalid date format. Use YYYY-MM-DD."})
        
        return queryset
    
    @action(['GET'], url_path='last-data', detail=False)
    def last_data(self, request):
        last_record = DHT11.objects.last()
        if last_record is None:
            return Response({ "message": "There is no temperature"}, status=404)
        data_ser = DHT11serialize(last_record)
        return Response(data_ser.data, status=200)
    
    @action(['GET'], url_path='export-csv', detail=False)
    def export_csv(self, request):
        try:
            queryset = super().get_queryset()
            start_date = self.request.query_params.get('start_date')
            end_date = self.request.query_params.get('end_date')
            if start_date and end_date:
                try:
                    queryset = queryset.filter(dt__range=[start_date, end_date])
                except ValueError:
                    raise ValidationError({"detail": "Invalid date format. Use YYYY-MM-DD."})
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="dht.csv"'
            writer = csv.writer(response)
            writer.writerow(['id', 'temp', 'hum', 'dt'])
            for entry in queryset:
                writer.writerow([entry.id, entry.temp, entry.hum, entry.dt])
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=500)