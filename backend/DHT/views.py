import posixpath
import csv
from django.shortcuts import render
from .models import DHT11 # Assurez-vous d'importer le modèle DHT11
from django.utils import timezone
from django.http import HttpResponse
from django.utils import timezone
from django.http import JsonResponse
from datetime import timedelta
import datetime
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set.'})


def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)

def home(request):
    return render(request, 'home.html')

def table(request):
    derniere_ligne = DHT11.objects.last()
    if derniere_ligne is None:
        derniere_ligne = {'dt': '??', 'id': '??', 'temp': '??', 'hum': '??'}
        return render(request, 'value.html', {'valeurs': derniere_ligne})
    print(derniere_ligne)
    derniere_date = derniere_ligne.dt
    delta_temps = timezone.now() - derniere_date
    difference_minutes = delta_temps.seconds // 60
    temps_ecoule = ' il y a ' + str(difference_minutes) + ' min'
    if difference_minutes > 60:
        temps_ecoule = 'il y ' + str(difference_minutes // 60) + 'h' + str(difference_minutes % 60) + 'min'
    valeurs = {'date': temps_ecoule, 'id': derniere_ligne.id, 'temp': derniere_ligne.temp, 'hum':
    derniere_ligne.hum}
    return render(request, 'value.html', {'valeurs': valeurs})

def download_csv(request):
    model_values = DHT11.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="dht.csv"'
    writer = csv.writer(response)
    writer.writerow(['id', 'temp', 'hum', 'dt'])
    liste = model_values.values_list('id', 'temp', 'hum', 'dt')
    for row in liste:
        writer.writerow(row)
    return response
#pour afficher navbar de template
def index_view(request):
    return render(request, 'index.html')

#pour afficher les graphes
def graphiqueTemp(request):
    return render(request, 'ChartTemp.html')
# récupérer toutes les valeur de température et humidity sous forme un #fichier json
def graphiqueHum(request):
    return render(request, 'ChartHum.html')

def chart_data(request):
    dht = DHT11.objects.all()
    data = {
    'temps': [Dt.dt for Dt in dht],
    'temperature': [Temp.temp for Temp in dht],
    'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)

def chart_data_jour(request):
    dht = DHT11.objects.all()
    now = timezone.now()
    # Récupérer l'heure il y a 24 heures
    last_24_hours = now - timezone.timedelta(hours=24)
    # Récupérer tous les objets de Module créés au cours des 24 dernières heures
    dht = DHT11.objects.filter(dt__range=(last_24_hours, now))
    data = {
    'temps': [Dt.dt for Dt in dht],
    'temperature': [Temp.temp for Temp in dht],
    'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)

#pour récupérer les valeurs de température et humidité de dernier semaine
# et envoie sous forme JSON
def chart_data_semaine(request):
    dht = DHT11.objects.all()
    # calcul de la date de début de la semaine dernière
    date_debut_semaine = timezone.now().date() - datetime.timedelta(days=7)
    print(datetime.timedelta(days=7))
    print(date_debut_semaine)
    # filtrer les enregistrements créés depuis le début de la semaine dernière
    dht = DHT11.objects.filter(dt__gte=date_debut_semaine)
    data = {
    'temps': [Dt.dt for Dt in dht],
    'temperature': [Temp.temp for Temp in dht],
    'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)

#pour récupérer les valeurs de température et humidité de dernier moins
# et envoie sous forme JSON
def chart_data_mois(request):
    dht = DHT11.objects.all()
    date_debut_semaine = timezone.now().date() - datetime.timedelta(days=30)
    print(datetime.timedelta(days=30))
    print(date_debut_semaine)
    # filtrer les enregistrements créés depuis le début de la semaine dernière
    dht = DHT11.objects.filter(dt__gte=date_debut_semaine)
    data = {
    'temps': [Dt.dt for Dt in dht],
    'temperature': [Temp.temp for Temp in dht],
    'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})