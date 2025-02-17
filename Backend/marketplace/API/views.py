from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product,Cart, CartItem,Order
from .models import User as DbUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser
from API.in_api.serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Count
from .serializers  import CartItemSerializer


class ProductCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        
        if 'name' in request.data:
            request.data['name'] = request.data['name'].upper()
        user = request.user
        print("Current User:", user)
        user_instance = get_object_or_404(DbUser, email=user.email)  


        request.data['seller'] = user_instance.user_id 

        if 'category' not in request.data:
            return Response({'error': 'Category is required.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class UpdateProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def put(self, request, product_id, *args, **kwargs):
        try:
            product = get_object_or_404(Product, product_id=product_id)
            user_instance = get_object_or_404(DbUser, name=request.user)

            if product.seller.user_id!=user_instance.user_id:
                raise PermissionDenied("You do not have permission to update this product.")

            
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



class TopProductsView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            products = (Product.objects
                        .values('name')
                        .annotate(count=Count('name'))
                        .order_by('-count')[:6])

            result = [{'name': product['name'], 'count': product['count']} for product in products]

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



class RecentProductsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            user_instance = get_object_or_404(DbUser, email=user.email)

            region = user_instance.region_id

            if not region:
                return Response({"error": "User does not have a region assigned."}, status=status.HTTP_400_BAD_REQUEST)

            category = request.query_params.get('category', None)

            if category:
                products = Product.objects.filter(
                    seller__region_id=region.region_id,
                    category=category,
                    active=1,
                    max_quantity__gt=0
                ).order_by('-product_id')[:8]
            else:
                products = Product.objects.filter(
                    seller__region_id=region.region_id,
                    active=1,
                    max_quantity__gt=0
                ).order_by('-product_id')[:8]

            if not products.exists():
                return Response({"message": "No products found for this region."}, status=status.HTTP_200_OK)

            base_url = request.build_absolute_uri('/')

            result = []
            for product in products:
                # Process seller image URL
                seller_image_url = product.seller.image.url if product.seller.image else None
                if seller_image_url and "media/" in seller_image_url:
                    seller_image_url = seller_image_url.replace("laangol/", "")
                    seller_image_url = f"http://127.0.0.1:8000/{seller_image_url}"

                # Add product data to result list
                result.append({
                    'name': product.name,
                    'product_id':product.product_id,
                    'price': product.price,
                    'seller': product.seller.name,
                    'seller_id':product.seller.user_id,
                    'category': product.category,
                    'description': product.description,
                    'image': base_url + product.image.url if product.image else None,
                    'sellerImage': seller_image_url,  # Processed seller image URL
                })

            return Response(result, status=status.HTTP_200_OK)

        except DbUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except AttributeError:
            return Response({"error": "User does not have a region assigned."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class MoreProductsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id, *args, **kwargs):
        user = request.user
        user_instance = get_object_or_404(DbUser, email=user.email)

        specified_product = get_object_or_404(Product, product_id=product_id, active=1)

        # Get the seller of the specified product
        seller = specified_product.seller

        # Retrieve products from the same seller that are active and have quantity > 0
        products = Product.objects.filter(
            seller=seller,
            active=1,
            max_quantity__gt=0
        ).exclude(product_id=specified_product.product_id).order_by('-max_quantity')[:6]

        base_url = request.build_absolute_uri('/')  

        products_data = []
        for product in products:
            product_image_url = base_url + product.image.url if product.image else None

            product_data = {
                "product_id": product.product_id,
                "name": product.name,
                "image": product_image_url,
                "product_owner_name": product.seller.name,
                "price": product.price,
            }
            products_data.append(product_data)

        return Response(products_data, status=200)





class AddCart(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the product
        product = get_object_or_404(Product, product_id=product_id)

        # Check if the cart item already exists for this user
        cart_item = Cart.objects.filter(user=user, status='Pending').first()

        if cart_item:
            # Here you should check the related items in cart_item
            # Assuming 'items' is a ManyToMany field in your Cart model
            # This part will depend on how your Cart and CartItem are structured
            existing_item = cart_item.items.filter(product=product).first()
            
            if existing_item:
                if existing_item.quantity + quantity <= product.max_quantity:
                    existing_item.quantity += quantity
                    existing_item.save()
                    return Response({'message': 'Product quantity updated successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': f'Cannot add more than {product.max_quantity} units of this product.'}, 
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                # Add a new item to the existing cart
                if quantity > product.max_quantity:
                    return Response({'error': f'Cannot add more than {product.max_quantity} units of this product.'}, 
                                    status=status.HTTP_400_BAD_REQUEST)

                # Create a new CartItem and link it to the Cart
                CartItem.objects.create(cart=cart_item, product=product, quantity=quantity)
                return Response({'message': 'Product added to cart successfully.'}, status=status.HTTP_201_CREATED)
        else:
            # Create a new cart and add the item
            if quantity > product.max_quantity:
                return Response({'error': f'Cannot add more than {product.max_quantity} units of this product.'}, 
                                status=status.HTTP_400_BAD_REQUEST)

            new_cart = Cart.objects.create(user=user, status='Pending')
            CartItem.objects.create(cart=new_cart, product=product, quantity=quantity)

            return Response({'message': 'Product added to cart successfully.'}, status=status.HTTP_201_CREATED)



class CartView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)

        # Check if the cart exists for the user with 'Pending' status
        cart = Cart.objects.filter(user=user, status='Pending').first()

        if not cart:
            # Return a response with zero items if the cart is not found
            response_data = {
                "cart_id": None,
                "items": [],
                "total_amount": 0  # No items, so the total amount is 0
            }
            return Response(response_data, status=status.HTTP_200_OK)

        # If the cart is found, get the cart items
        cart_items = CartItem.objects.filter(cart=cart)

        cart_items_data = []
        total_amount = 0

        for item in cart_items:
            product_total_price = item.product.price * item.quantity  # Calculate individual product total price
            total_amount += product_total_price  # Add to the overall total amount

            # Prepare cart item data
            cart_items_data.append({
                "product_id": item.product.product_id,
                "product_name": item.product.name,
                "quantity": item.quantity,
                "unit_price": item.product.price,
                "total_price": product_total_price,  # Individual total price for this product
            })

        response_data = {
            "cart_id": cart.cart_id,
            "items": cart_items_data,
            "total_amount": total_amount  # Overall total amount
        }

        return Response(response_data, status=status.HTTP_200_OK)



class CheckoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_ins = request.user
        cart_id = request.data.get('cart_id')

        print(cart_id)
        if not cart_id:
            print(cart_id)
            return Response({"error": "Cart ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(DbUser, email=user_ins.email)
        cart = get_object_or_404(Cart, cart_id=cart_id, user=user, status='Pending')

        cart_items = CartItem.objects.filter(cart=cart)
        if not cart_items.exists():
            return Response({"error": "Cart is empty. Cannot proceed with checkout."}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate total price
        total_price = sum(item.product.price * item.quantity for item in cart_items)

        # Get payment method and shipping address from the request
        payment_method = request.data.get('payment_method')
        shipping_address = request.data.get('shipping_address')

        if not payment_method or not shipping_address:
            return Response({"error": "Payment method and shipping address are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Create an order
        order = Order.objects.create(
            user=user,
            cart=cart,
            total_price=total_price,
            payment_method=payment_method,
            shipping_address=shipping_address,
            status='Order Placed'
        )

        for item in cart_items:
            product = item.product
            if product.max_quantity >= item.quantity:
                # Decrease the product's max_quantity by the purchased quantity
                product.max_quantity -= item.quantity
                product.save()
            else:
                return Response({"error": f"Not enough stock for product {product.name}."}, status=status.HTTP_400_BAD_REQUEST)

        cart.status = 'Checked Out'
        cart.save()

        return Response({
            "order_id": order.order_id,
            "message": "Checkout successful",
            "total_price": total_price,
            "status": order.status
        }, status=status.HTTP_200_OK)



class RemoveCartItemView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        cart_id = request.data.get('cart_id')
        product_id = request.data.get('product_id')

        if not cart_id or not product_id:
            return Response({"error": "Cart ID and Product ID are required."}, status=status.HTTP_400_BAD_REQUEST)

        cart = get_object_or_404(Cart, cart_id=cart_id, user=user, status='Pending')

        cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)

        cart_item.delete()

        return Response({
            "message": "Cart item removed successfully.",
            "cart_item": {
                "product": cart_item.product.name
            }
        }, status=status.HTTP_200_OK)






class InventoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)

        products = Product.objects.filter(seller=user)

        serializer = ProductSerializer(products, many=True)

        return Response({
            "inventory": serializer.data,
            "total_products": products.count()
        }, status=200)
