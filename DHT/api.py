import os
from .models import DHT11
from .serializers import DHT11serialize
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from twilio.rest import Client
from .alerts.whatsapp_alert import WhatsappAlert
from .alerts.email_alert import EmailAlert
from .alerts.telegram_alert import TelegramAlert
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

DHT11.objects.all().delete()

@api_view(['GET', 'POST'])
def d_list(request):
    if request.method == 'GET':
        all_data = DHT11.objects.all()
        data_ser = DHT11serialize(all_data, many=True)
        print(data_ser.data)
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
        

