from django.urls import path, include,re_path
from . import views
from rest_framework.routers import DefaultRouter
from .viewsets.user import UserViewSet
from .viewsets.dht import DHTViewSet
from .viewsets.incident import IncidentViewSet
from django.conf import settings

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('dhts', DHTViewSet, basename='DHT')
router.register('incidents', IncidentViewSet, basename='Incident')

urlpatterns = [
    path('', views.home, name='home'),
    path('api/', include(router.urls)),

    # path('download_csv/', views.download_csv, name='download_csv'),
    path('index/',views.table,name='table'),
    path('csrf/', views.get_csrf_token),
    re_path(r"^(?P<path>.*)$", views.serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),

    # path('myChartTemp/',views.graphiqueTemp,name='myChartTemp'),
    # path('myChartHum/', views.graphiqueHum, name='myChartHum'),
    
    # path('chart-data/',views.chart_data, name='chart-data'),
    # path('chart-data-jour/',views.chart_data_jour,name='chart-data-jour'),
    # path('chart-data-semaine/',views.chart_data_semaine,name='chart-data-semaine'),
    # path('chart-data-mois/',views.chart_data_mois,name='chart-data-mois'),
]