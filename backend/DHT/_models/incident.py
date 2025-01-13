from django.db import models
from .dht import DHT11
from .user import User

class Incident(models.Model):
    STATUS = (
        (0, 'Non résolu'),
        (1, 'Résolu')
    )  

    temp = models.FloatField(null=False)
    hum = models.FloatField(null=False)
    dt = models.DateTimeField(auto_now_add=True, null=False)
    resolver = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE
    )
    status = models.CharField(max_length=25,default=STATUS[0][0],choices=STATUS)
    comment = models.CharField(max_length=200, null=True)


