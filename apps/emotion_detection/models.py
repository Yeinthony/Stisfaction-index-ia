from django.db import models
from apps.users.models import User

# Create your models here.
class Emotions(models.Model):
    neutral = models.DecimalField(max_digits=5, decimal_places=2)
    disgust = models.DecimalField(max_digits=5, decimal_places=2)
    surprise = models.DecimalField(max_digits=5, decimal_places=2)
    angry = models.DecimalField(max_digits=5, decimal_places=2)
    happy = models.DecimalField(max_digits=5, decimal_places=2)
    registred = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)