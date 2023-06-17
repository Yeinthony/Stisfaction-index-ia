from apps.emotion_detection.models import Expretions
from rest_framework import serializers


class ExpretionsSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Expretions
        fields = '__all__'
