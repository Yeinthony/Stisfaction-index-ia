from apps.emotion_detection.models import Expretions, Ages, Genders
from rest_framework import serializers


class ExpretionsSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Expretions
        fields = '__all__'

class AgesSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Ages
        fields = '__all__'

class GendersSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Genders
        fields = '__all__'
