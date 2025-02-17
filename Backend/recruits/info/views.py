from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import User
from .serializers import LabourProfileSerializer

class LabourProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Get the authenticated user
            user = request.user

            # Check if the user is a laborer
            if user.type != 'Laborer':
                return Response({"detail": "User is not a laborer."}, status=status.HTTP_403_FORBIDDEN)

            # Serialize the user's data
            serializer = LabourProfileSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
