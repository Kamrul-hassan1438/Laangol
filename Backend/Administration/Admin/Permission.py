from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404
from .models import User as DbUser

class IsAdminUserWithSpecialID(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False
        
        user_instance = get_object_or_404(DbUser, email=user.email)

     
        if user_instance.type != 'ADMIN':
            return False
        
        special_id = user_instance.special_id
        special_id_str = str(special_id)

        if not special_id_str.startswith("11") or not (8 <= len(special_id_str) <= 10):
            return False 

        return True 
