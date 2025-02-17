from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User  # Adjust import based on your project structure


class UserSerializers(ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensures password is required and write-only

    class Meta:
        model = User
        fields = ('name', 'email', 'password', 'number', 'type', 'region_id', 'active', 'image')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)  # Explicitly create a User instance
        if password:
            user.password = make_password(password)  # Use set_password for password hashing
            user.save()
        return user

