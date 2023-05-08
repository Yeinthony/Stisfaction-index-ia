from django.db import models
from apps.users.models import User
from simple_history.models import HistoricalRecords

# Create your models here.
class Emotions(models.Model):
    neutral = models.DecimalField('Neutral', max_digits=5, decimal_places=2, null=False, blank=False)
    disgust = models.DecimalField('Disgusto', max_digits=5, decimal_places=2, null=False, blank=False)
    surprise = models.DecimalField('Sorpresa', max_digits=5, decimal_places=2, null=False, blank=False)
    angry = models.DecimalField('Enojo', max_digits=5, decimal_places=2, null=False, blank=False)
    happy = models.DecimalField('Felicidad',max_digits=5, decimal_places=2, null=False, blank=False)
    registred = models.DateTimeField('Fecha de registro', auto_now_add=True, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False) 
    historical = HistoricalRecords()


    @property
    def _history_user(self):
        return self.changed_by
    
    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = "Deteccion"
        verbose_name_plural = "Detecciones"

    def __str__(self) -> str:
        return f'registrado el: {self.registred}, por {self.user.username}'