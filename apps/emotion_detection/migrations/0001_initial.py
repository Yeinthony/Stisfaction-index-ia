# Generated by Django 4.2 on 2023-06-17 15:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalGenders',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('male', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Masculino')),
                ('female', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Femenino')),
                ('registred', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de registro')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Gender',
                'verbose_name_plural': 'historical Genders',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalExpretions',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('angry', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Enojo')),
                ('disgust', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Disgusto')),
                ('fear', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Miedo')),
                ('happy', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Felicidad')),
                ('neutral', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Neutral')),
                ('sad', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Tristeza')),
                ('surprise', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Sorpresa')),
                ('registred', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de registro')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Expretions',
                'verbose_name_plural': 'historical Expretion',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalAges',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('six_to_eleven', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='6-11')),
                ('twelve_to_eighteen', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='12-18')),
                ('nineteen_to_twentysix', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='19-26')),
                ('twentyseveven_to_fiftynine', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='27-59')),
                ('sixty_to_eighty', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='60-90')),
                ('registred', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de registro')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Age',
                'verbose_name_plural': 'historical Ages',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='Genders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('male', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Masculino')),
                ('female', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Femenino')),
                ('registred', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de registro')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Gender',
                'verbose_name_plural': 'Genders',
            },
        ),
        migrations.CreateModel(
            name='Expretions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('angry', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Enojo')),
                ('disgust', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Disgusto')),
                ('fear', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Miedo')),
                ('happy', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Felicidad')),
                ('neutral', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Neutral')),
                ('sad', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Tristeza')),
                ('surprise', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Sorpresa')),
                ('registred', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de registro')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Expretions',
                'verbose_name_plural': 'Expretion',
            },
        ),
        migrations.CreateModel(
            name='Ages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('six_to_eleven', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='6-11')),
                ('twelve_to_eighteen', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='12-18')),
                ('nineteen_to_twentysix', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='19-26')),
                ('twentyseveven_to_fiftynine', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='27-59')),
                ('sixty_to_eighty', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='60-90')),
                ('registred', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de registro')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Age',
                'verbose_name_plural': 'Ages',
            },
        ),
    ]
