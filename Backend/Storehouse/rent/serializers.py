from rest_framework import serializers
from .models import StorehousesRental,Storehouses

class StorehouseRentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorehousesRental
        fields = ['storehouse', 'renter', 'start_date', 'end_date', 'rental_size', 'rent_price']

    def validate(self, data):
        if data['end_date'] <= data['start_date']:
            raise serializers.ValidationError("End date must be after start date.")
        return data

    def create(self, validated_data):
        return super().create(validated_data)


class StorehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storehouses
        fields = ['name',  'descriptions','temperature_range', 'location', 'rent_per_sq', 'total_size', 'owner', 'active']
