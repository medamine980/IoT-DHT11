from django.db import models

class DHT11(models.Model):
    temp = models.FloatField(null=False)
    hum = models.FloatField(null=False)
    dt = models.DateTimeField(auto_now_add=True, null=True)