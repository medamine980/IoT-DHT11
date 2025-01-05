from django.db import models
from ._models.user import *

# Create your models here.

class DHT11(models.Model):
    temp = models.FloatField(null=True)
    hum = models.FloatField(null=True)
    dt = models.DateTimeField(auto_now_add=True, null=True)