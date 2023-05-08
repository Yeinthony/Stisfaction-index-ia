from apps.emotion_detection.models import Emotions
from rest_framework import serializers


class DetectionsSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Emotions
        fields = '__all__'
