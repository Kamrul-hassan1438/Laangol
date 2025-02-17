from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import User as Dbuser
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token  
from django.contrib.auth.models import User as Django_user



class UpdateUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        token_key = request.auth.key 

        try:
            token = Token.objects.get(key=token_key)
            django_user = get_object_or_404(Django_user, pk=token.user_id)
            user_instance = get_object_or_404(Dbuser, email=django_user.email)

        except Token.DoesNotExist:
            return Response({"detail": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        except Dbuser.DoesNotExist:
            return Response({"detail": "Custom user not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get the new data from the request
        new_username = request.data.get("username")
        new_email = request.data.get("email")
        new_region_id = request.data.get("region_id")

        # Update Django_user fields based on the provided data
        if new_username:
            django_user.username = new_username  # Update Django_user username

        if new_email:
            django_user.email = new_email  # Update Django_user email

        # Update the custom user fields
        if new_region_id:
            user_instance.region_id = new_region_id  # Update the region_id in Dbuser

        # Prepare data for serializer
        serializer = UserSerializer(user_instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            django_user.save()  # Save Django user changes
            user_instance.save()  # Save custom user changes
            serializer.save()  # Save serializer data

            return Response({
                'message': 'User updated successfully',
                'django_user': {
                    'username': django_user.username,
                    'email': django_user.email,
                },
                'custom_user': serializer.data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class UserInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
       
        user = get_object_or_404(Dbuser, email=request.user.email)

        serializer = UserSerializer(user)
        image_url = user.image.url if user.image else None
        if image_url:
            image_url = request.build_absolute_uri(image_url)


        response_data = serializer.data
        response_data['image'] = image_url  

        return Response(response_data, status=200)

