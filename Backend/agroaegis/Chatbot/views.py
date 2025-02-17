from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ChatbotInteraction
from .serializers import ChatbotInteractionSerializer
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from .models import User as DbUser
from django.utils import timezone
from datetime import timedelta
from rest_framework_simplejwt.authentication import JWTAuthentication

class ChatbotInteractionHistoryView(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        user_instance = request.user  
        user = get_object_or_404(DbUser, email=user_instance.email)
        print(user)
        now = timezone.now()
        seven_days_ago = now - timedelta(days=7)

        interactions = ChatbotInteraction.objects.filter(
            user=user,
            question_time__gte=seven_days_ago  
        ).order_by('question_time')  
        serializer = ChatbotInteractionSerializer(interactions, many=True)

        return Response(serializer.data)




class ChatbotInteractionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_instance = request.user  
        user = get_object_or_404(DbUser, email=user_instance.email)
        print(user)
        data = request.data
        data['question_time'] = None 

        serializer = ChatbotInteractionSerializer(data=data)

        if serializer.is_valid():
            serializer.save(user=user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
