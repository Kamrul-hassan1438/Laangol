from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .Permission import IsAdminUserWithSpecialID
from rest_framework import status
from .models import User as DbUser
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404


class AdminOnlyView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUserWithSpecialID]

    def get(self, request, *args, **kwargs):
        return Response({"message": "You are an Admin with a valid special ID."})


class AdminUserListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUserWithSpecialID]  

    def get(self, request, *args, **kwargs):
        admin_user = get_object_or_404(DbUser, email=request.user.email)
        region = admin_user.region_id  
        users_in_region = DbUser.objects.filter(region_id=region).exclude(type='ADMIN')
        users_data = []

        for user in users_in_region:
            user_data = UserSerializer(user).data
            image_url = user.image.url if user.image else None
            if image_url:
               
                image_url = f"http://127.0.0.1:8000{image_url}"  
            user_data['image'] = image_url  #
            users_data.append(user_data)

        return Response(users_data, status=status.HTTP_200_OK)
    


class UserCountView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUserWithSpecialID]  

    def get(self, request, *args, **kwargs):
        total_users = DbUser.objects.count()
        
        total_farmers = DbUser.objects.filter(type='FARMER').count()
        total_consumers = DbUser.objects.filter(type='CONSUMER').count()

        response_data = {
            'total_users': total_users,
            'total_farmers': total_farmers,
            'total_consumers': total_consumers
        }

        return Response(response_data, status=200)
    


class AllUsersView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        users = DbUser.objects.exclude(type='ADMIN')

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data, status=200)