from rest_framework import serializers
from .models import User as DbUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbUser
        fields = ['user_id','name', 'number', 'type', 'image'] 