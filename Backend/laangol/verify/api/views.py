from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import User

from .serializers import UserSerializers


from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated 


class UserViewset(ModelViewSet):
    queryset = User.objects.all()
    @action(detail=False, methods=['get'], url_path='counts')
    def get_counts(self, request):
        users_count = User.objects.count()
        return Response({'users_count': users_count})
    

   

