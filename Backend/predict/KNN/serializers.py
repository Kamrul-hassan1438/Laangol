from rest_framework import serializers

class CropPredictionSerializer(serializers.Serializer):
    Crop = serializers.CharField(max_length=100)
    Region = serializers.CharField(max_length=100)
    Month = serializers.IntegerField()
    Weather = serializers.IntegerField()
    Year = serializers.IntegerField()
