from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .viewsets.user import UserViewSet
from .viewsets.dht import DHTViewSet

# url_dhtpatterns = [
#     path("api/dht",dht.d_list,name='json'),
#     path("api/dht/post",dht.d_list,name='json'),
#     path("api/dht/last-data",dht.last_data,name='json'),
# ]

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('dhts', DHTViewSet, basename='DHT')

urlpatterns = [
    path('', views.home, name='home'),
    path('api/', include(router.urls)),

    path('download_csv/', views.download_csv, name='download_csv'),
    path('index/',views.table,name='table'),
    path('myChartTemp/',views.graphiqueTemp,name='myChartTemp'),
    path('myChartHum/', views.graphiqueHum, name='myChartHum'),
    
    path('chart-data/',views.chart_data, name='chart-data'),
    path('chart-data-jour/',views.chart_data_jour,name='chart-data-jour'),
    path('chart-data-semaine/',views.chart_data_semaine,name='chart-data-semaine'),
    path('chart-data-mois/',views.chart_data_mois,name='chart-data-mois'),
    # path('', views.home, name='home'),
]

# urlpatterns.extend(url_dhtpatterns)
# urlpatterns.extend(url_userpatterns)