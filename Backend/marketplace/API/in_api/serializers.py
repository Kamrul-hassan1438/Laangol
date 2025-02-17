
from rest_framework import serializers
from ..models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id','category', 'price', 'name', 'description', 'max_quantity', 'seller', 'active', 'image']
        read_only_fields = ['product_id']
