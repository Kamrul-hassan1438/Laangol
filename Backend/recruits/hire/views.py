from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Labour,Region, LabourHire
from .models import User as DbUser
from .serializers import LabourSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from datetime import datetime
from django.utils import timezone


class AddLabourView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user_instance = get_object_or_404(DbUser, email=user.email)
        try:
            labour_instance = Labour.objects.get(user=user_instance)
            
            serializer = LabourSerializer(labour_instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': f'Labour info for user {user_instance.user_id} updated successfully.','data': serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Labour.DoesNotExist:
            data = request.data.copy()  
            data['user_id'] = user_instance.user_id  

            serializer = LabourSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Labour info created successfully.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LabourByRegionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_instance = get_object_or_404(DbUser, email=user.email)
        user_region_id = user_instance.region_id.region_id
        
        current_time = timezone.now().date()

        laborers = Labour.objects.filter(
            user__region_id=user_region_id,
            status='Available',
            active=1
        ).exclude(user=user_instance)
        
        laborers_data = []

        for laborer in laborers:
            overlapping_hires = LabourHire.objects.filter(
                labour=laborer,
                status='Accept',
                start_date__lte=current_time,  
                end_date__gte=current_time  
            ).exists()  

            if overlapping_hires:
                continue  

            image_url = laborer.user.image.url if laborer.user.image else None
            if image_url and "laangol/" in image_url:
                image_url = image_url.replace("laangol/", "")
                image_url = f"http://127.0.0.1:8000/{image_url}"

            laborer_data = {
                "laborer_name": laborer.user.name,
                "laborer_ID": laborer.user.user_id,
                "region_name": laborer.user.region_id.name,
                "experience": laborer.experience,
                "specialties": laborer.specialates,
                "demand_fees": laborer.demand_fees,
                "status": laborer.status,
                "labour_id": laborer.labour_id,
                "image_url": image_url
            }

            laborers_data.append(laborer_data)

        return Response(laborers_data, status=200)



class LabourHireView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        # Get the hirer based on the authenticated user (token)
        hirer = request.user

        # Check if the hirer is authenticated
        if not hirer.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Retrieve DbUser instance for the authenticated hirer
        hirer_instance = get_object_or_404(DbUser, email=hirer.email)

        # Get the labour_id from request data and retrieve the Labour instance
        labour_id = request.data.get('labour_id')
        if not labour_id:
            return Response({'error': 'Labour ID must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

        labour_instance = get_object_or_404(Labour, labour_id=labour_id)

        # Get start and end date from request data
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        # Validate if start and end date are provided
        if not start_date or not end_date:
            return Response({'error': 'Start date and end date must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the start and end dates to datetime objects
        try:
            start_dt = datetime.strptime(start_date, '%Y-%m-%d')
            end_dt = datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure that the end date is after the start date
        if end_dt <= start_dt:
            return Response({'error': 'End date must be after start date.'}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate the duration in hours (assuming each day has 24 hours)
        duration_in_hours = (end_dt - start_dt).days * 24

        # Get the per-hour salary from the Labour model
        per_hour_salary = labour_instance.demand_fees
        if not per_hour_salary:
            return Response({'error': 'Labour demand fees are not set.'}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate the total amount
        total_amount = duration_in_hours * per_hour_salary

        # Get status from request data or set default to 'pending'
        status_value = request.data.get('status', 'pending')
        if status_value not in ['available', 'notavailable', 'pending']:
            return Response({'error': 'Invalid status value.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new LabourHire object
        labour_hire = LabourHire.objects.create(
            labour=labour_instance,
            hirer=hirer_instance,
            amount=total_amount,
            start_date=start_dt,
            end_date=end_dt,
            active=True,  
            status=status_value  
        )

        # Return the response with the created LabourHire details
        return Response({
            'message': 'Labour hired successfully.',
            'hire_id': labour_hire.hire_id,
            'labour_id': labour_hire.labour.labour_id,
            'hirer_id': labour_hire.hirer.user_id,
            'amount': labour_hire.amount,
            'start_date': labour_hire.start_date,
            'end_date': labour_hire.end_date,
            'status': labour_hire.status
        }, status=status.HTTP_201_CREATED)
    



class PendingHireRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        labour_instance = get_object_or_404(Labour, user=user)
        pending_requests = LabourHire.objects.filter(labour=labour_instance, status='pending').select_related('hirer')
        current_time = timezone.now().date()
        response_data = []

        for hire_request in pending_requests:
            if hire_request.end_date and hire_request.end_date < current_time:
                hire_request.status = "Auto-Rejected"
                hire_request.active = 0
                hire_request.save()
                continue
            
            # Format the hirer's image URL
            hirer_image_url = hire_request.hirer.image.url if hire_request.hirer.image else None
            if hirer_image_url and "laangol/" in hirer_image_url:
                hirer_image_url = hirer_image_url.replace("laangol/", "")
                hirer_image_url = f"http://127.0.0.1:8000/{hirer_image_url}"

            response_data.append({
                'hire_id': hire_request.hire_id,
                'amount': hire_request.amount,
                'start_date': hire_request.start_date,
                'end_date': hire_request.end_date,
                'hirer_name': hire_request.hirer.name,
                'hirer_region': hire_request.hirer.region_id.name if hire_request.hirer.region_id else None,
                'hirer_phone': hire_request.hirer.number,
                'hirer_image': hirer_image_url,  # Use formatted image URL
            })

        return Response({'pending_requests': response_data}, status=200)




class UpdateHireStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Get the authenticated user from the token
        user = get_object_or_404(DbUser, email=request.user.email)  # Adjust based on your setup

        # Now, get the Labour instance associated with this user
        labour_instance = get_object_or_404(Labour, user=user)

        # Get the hire_id from the request data
        hire_id = request.data.get('hire_id')
        if not hire_id:
            return Response({'error': 'Hire ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the hire request associated with this labourer and hire_id
        labour_hire = get_object_or_404(LabourHire, hire_id=hire_id, labour=labour_instance)

        # Get the status from the request data
        new_status = request.data.get('status')
        if new_status not in ['Accept', 'Reject']:
            return Response({'error': 'Invalid status. Must be either "Accept" or "Reject".'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the status and active field
        if new_status == 'Accept':
            labour_hire.status = 'Accept'
        elif new_status == 'Reject':
            labour_hire.status = 'Reject'
            labour_hire.active = False 

        labour_hire.save()

        return Response({
            'message': f'Hire request {new_status.lower()}ed successfully.',
            'hire_id': labour_hire.hire_id,
            'status': labour_hire.status,
            'active': labour_hire.active
        }, status=status.HTTP_200_OK)
    






class UserLabourInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        
        labour_info = Labour.objects.filter(user=user).first()
        
        image_url = user.image.url if user.image else None
        if image_url and "laangol/" in image_url:
            image_url = image_url.replace("laangol/", "")
            image_url = f"http://127.0.0.1:8000/{image_url}"

        current_time = timezone.now().date()
        upcoming_work = LabourHire.objects.filter(
            labour=labour_info,
            status='Accept',
            start_date__gte=current_time  
        ).select_related('hirer').values(
            'hirer__name', 
            'hire_id',
            'amount', 
            'start_date', 
            'end_date'
        )

        if labour_info is None:
            # If labour info doesn't exist, return None for labour-specific fields
            response_data = {
                "labour_id": None,
                "specialates": None,
                "status": None,
                "demand_fees": None,
                "experience": None,
                "user_name": user.name,
                "region_name": user.region_id.name if user.region_id else None,
                "phone_number": user.number,
                "user_image": image_url,
                "upcoming_work": []  # Return empty list if no labour info
            }
        else:
            # Return both user's and labour info
            response_data = {
                "labour_id": labour_info.labour_id,
                "specialates": labour_info.specialates,
                "status": labour_info.status,
                "demand_fees": str(labour_info.demand_fees), 
                "experience": labour_info.experience,
                "user_name": user.name,
                "region_name": user.region_id.name if user.region_id else None,
                "phone_number": user.number,
                "user_image": image_url,
                "upcoming_work": list(upcoming_work)  # Convert queryset to list
            }

        return Response(response_data, status=status.HTTP_200_OK)
