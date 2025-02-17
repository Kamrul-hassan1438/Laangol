from django.shortcuts import get_object_or_404
from .models import User as DbUser
from rest_framework.response import Response
from .api.serializers import UserSerializers 
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User as Django_user
from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated 

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return Response({"detail": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the user from the custom user model (DbUser)
        user = get_object_or_404(DbUser, email=email)

        # Verify the password
        if not check_password(password, user.password):
            return Response({"detail": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the corresponding Django user for token creation
        Convert_user = get_object_or_404(Django_user, email=email)
        token, created = Token.objects.get_or_create(user=Convert_user)

        # Serialize the user data from your custom DbUser model
        serializer = UserSerializers(instance=user)

        # Return token and user data
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
    
    except DbUser.DoesNotExist:
        return Response({"detail": "User not found. Please provide a valid email."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def signup(request):
    serializer = UserSerializers(data=request.data)

    # Check if the email already exists in Django_user or Dbuser
    if Django_user.objects.filter(email=request.data.get('email')).exists() or DbUser.objects.filter(email=request.data.get('email')).exists():
        return Response({"error": "Email already exists, cannot sign up with this email."}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        try:
            # Save the user in your custom Dbuser model
            user = serializer.save()

            # Create a corresponding user in Django's default User model
            user_instance = Django_user.objects.create_user(
                username=user.name,
                email=user.email,
                password=user.password
            )

            # Generate a token for the user
            token, created = Token.objects.get_or_create(user=user_instance)

            return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"An error occurred: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])  
def gettoken(request):
    return Response("Passed for {}".format(request.user.email))



