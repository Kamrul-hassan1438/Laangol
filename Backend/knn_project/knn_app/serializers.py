from rest_framework import serializers
from .models import KNNModel

class KNNModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = KNNModel
        fields = ['model_file']
