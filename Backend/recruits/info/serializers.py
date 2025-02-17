# serializers.py
from rest_framework import serializers
from .models import User, Region

class LabourProfileSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(source='region_id.name', read_only=True)

    class Meta:
        model = User
        fields = ['name', 'region_name', 'number', 'type']
