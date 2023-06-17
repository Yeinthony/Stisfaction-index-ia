from django.db import models
from apps.users.models import User
from simple_history.models import HistoricalRecords

# Create your models here.
class Expretions(models.Model):
    angry = models.DecimalField('Enojo', max_digits=5, decimal_places=2, null=False, blank=False)
    disgust = models.DecimalField('Disgusto', max_digits=5, decimal_places=2, null=False, blank=False)
    fear = models.DecimalField('Miedo', max_digits=5, decimal_places=2, null=False, blank=False)
    happy = models.DecimalField('Felicidad',max_digits=5, decimal_places=2, null=False, blank=False)
    neutral = models.DecimalField('Neutral', max_digits=5, decimal_places=2, null=False, blank=False)
    sad = models.DecimalField('Tristeza',max_digits=5, decimal_places=2, null=False, blank=False)
    surprise = models.DecimalField('Sorpresa', max_digits=5, decimal_places=2, null=False, blank=False)
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
        verbose_name = "Expretions"
        verbose_name_plural = "Expretion"

    def __str__(self) -> str:
        return f'registrado el: {self.registred}, por {self.user.username}'
    
class Ages(models.Model):
    six_to_eleven = models.DecimalField('6-11', max_digits=5, decimal_places=2, null=False, blank=False)
    twelve_to_eighteen = models.DecimalField('12-18', max_digits=5, decimal_places=2, null=False, blank=False)
    nineteen_to_twentysix = models.DecimalField('19-26', max_digits=5, decimal_places=2, null=False, blank=False)
    twentyseveven_to_fiftynine = models.DecimalField('27-59',max_digits=5, decimal_places=2, null=False, blank=False)
    sixty_to_eighty = models.DecimalField('60-90', max_digits=5, decimal_places=2, null=False, blank=False)
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
        verbose_name = "Age"
        verbose_name_plural = "Ages"

    def __str__(self) -> str:
        return f'registrado el: {self.registred}, por {self.user.username}'
    
class Genders(models.Model):
    male = models.DecimalField('Masculino', max_digits=5, decimal_places=2, null=False, blank=False)
    female = models.DecimalField('Femenino', max_digits=5, decimal_places=2, null=False, blank=False)
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
        verbose_name = "Gender"
        verbose_name_plural = "Genders"

    def __str__(self) -> str:
        return f'registrado el: {self.registred}, por {self.user.username}'