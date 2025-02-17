from rest_framework import serializers
from .models import Labour,LabourHire

class LabourSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)  # Allow user_id to be written

    class Meta:
        model = Labour
        fields = ['labour_id', 'specialates', 'preceable_time', 'status', 'demand_fees', 'rating', 'active', 'experience', 'user_id']  # Include user_id


class LabourHireSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabourHire
        fields = ['hire_id', 'hirer', 'labour', 'start_date', 'end_date', 'amount', 'active', 'status']
