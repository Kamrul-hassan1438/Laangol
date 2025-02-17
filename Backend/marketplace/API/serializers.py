from rest_framework import serializers
from .models import CartItem, Product  

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'price'] 

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer() 

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']  # Specify the fields to serialize

    def create(self, validated_data):
        # Extract the product data from the nested serializer
        product_data = validated_data.pop('product')
        # Create the CartItem instance
        cart_item = CartItem.objects.create(**validated_data, product=product_data)
        return cart_item

    def update(self, instance, validated_data):
        # Extract the product data if needed
        product_data = validated_data.pop('product', None)

        # Update the instance fields
        instance.quantity = validated_data.get('quantity', instance.quantity)

        if product_data:
            # Here you can handle the product update if needed
            pass

        instance.save()
        return instance
