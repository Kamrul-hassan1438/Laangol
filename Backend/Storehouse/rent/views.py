from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q
from .models import StorehousesRental, Storehouses
from datetime import datetime
from .models import User as DbUser
from .serializers import StorehouseRentalSerializer,StorehouseSerializer
from django.utils import timezone
from datetime import date



class AddStorehouseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user_instance = get_object_or_404(DbUser, email=user.email)
        
        try:
            storehouse_instance = Storehouses.objects.filter(owner=user_instance).first()
            
            data = request.data.copy()
            data['owner'] = user_instance.user_id

            if storehouse_instance:
                serializer = StorehouseSerializer(storehouse_instance, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Storehouse information updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = StorehouseSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Storehouse added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class StorehousesByRegionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_instance = get_object_or_404(DbUser, email=user.email)
        user_region_id = user_instance.region_id
        
        storehouses = Storehouses.objects.filter(owner__region_id=user_region_id).exclude(owner=user_instance)
        
        storehouses_data = []

        for storehouse in storehouses:
            active_rentals = StorehousesRental.objects.filter(
                storehouse=storehouse,
                status='Accept',
                end_date__gte=timezone.now().date()
            )


            total_rented_size = sum(rental.rental_size for rental in active_rentals)
            available_size = storehouse.total_size - total_rented_size  

            image_url = storehouse.owner.image.url if storehouse.owner.image else None
            if image_url and "laangol/" in image_url:
                image_url = image_url.replace("laangol/", "")
                image_url = f"http://127.0.0.1:8000/{image_url}"

            storehouse_data = {
                "storehouse_name": storehouse.name,
                "storehouse_id": storehouse.storehouse_id,
                "descriptions":storehouse.descriptions,
                "temperature_range": storehouse.temperature_range,
                "location": storehouse.location,
                "rent_per_sq": storehouse.rent_per_sq,
                "total_size": storehouse.total_size,
                "available_size": available_size,  
                "owner_name": storehouse.owner.name,
                "owner_contact": storehouse.owner.number,
                "image_url": image_url,
            }

            storehouses_data.append(storehouse_data)

        return Response(storehouses_data, status=200)



class StorehouseRentalView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        renter = request.user
        if not renter.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=401)

        renter_instance = get_object_or_404(DbUser, email=renter.email)

        print(request.data)
        storehouse_id = request.data.get('storehouse_id')
        if not storehouse_id:
            return Response({'error': 'Storehouse ID must be provided.'}, status=400)

        storehouse_instance = get_object_or_404(Storehouses, storehouse_id=storehouse_id)

        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        if not start_date or not end_date:
            return Response({'error': 'Start date and end date must be provided.'}, status=400)

        try:
            start_dt = datetime.strptime(start_date, '%Y-%m-%d')
            end_dt = datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)

    
        if end_dt <= start_dt:
            return Response({'error': 'End date must be after start date.'}, status=400)


        rental_size = request.data.get('rental_size')
        if not rental_size:
            return Response({'error': 'Rental size must be provided.'}, status=400)

        total_storehouse_size = storehouse_instance.total_size
        rentals = StorehousesRental.objects.filter(
            storehouse=storehouse_instance,
            status='Accept',
            end_date__gte=start_dt,  
            start_date__lte=end_dt,
            active=True
        )

        total_rented_size = sum(rental.rental_size for rental in rentals)
        available_size = total_storehouse_size - total_rented_size

        if float(rental_size) > available_size:
            if available_size > 0:
                return Response({
                    'error': f'Only {available_size} sq units are available during the requested period. Please adjust the rental size.'
                }, status=400)
            else:
                return Response({
                    'error': 'The storehouse is fully occupied during the requested period.'
                }, status=400)

        overlapping_rentals = StorehousesRental.objects.filter(
            storehouse=storehouse_instance,
            start_date__lt=end_dt,
            end_date__gt=start_dt,
            status='Accept',
            active=True
        )

        if overlapping_rentals.exists() and available_size == 0:
            return Response({'error': 'Storehouse is fully rented during the requested period.'}, status=400)

        duration_in_days = (end_dt - start_dt).days

        rent_price = float(storehouse_instance.rent_per_sq) * float(rental_size) * duration_in_days

        request_data = request.data.copy()
        request_data['renter'] = renter_instance.user_id
        request_data['storehouse'] = storehouse_instance.storehouse_id
        request_data['rent_price'] = rent_price

        serializer = StorehouseRentalSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Storehouse rent request successful.',
                'data': serializer.data
            }, status=201)

        return Response(serializer.errors, status=400)





class PendingStorehouseRequestsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        current_time = timezone.now().date()

        pending_requests = StorehousesRental.objects.filter(
            storehouse__owner=user,
            status='pending'
        ).select_related('storehouse', 'renter').exclude(
            Q(end_date__lt=current_time) 
        )

        response_data = []
        for rental_request in pending_requests:
            if rental_request.start_date < current_time:
                rental_request.status = "Auto-Rejected"
                rental_request.active = 0
                rental_request.save()
                continue

            renter = rental_request.renter
            image_url = renter.image.url if renter.image else None
            if image_url and "media/" in image_url:
                image_url = image_url.replace("laangol/", "")
                image_url = f"http://127.0.0.1:8000/{image_url}"

            
            response_data.append({
                'rental_id': rental_request.rental_id,
                'rental_name': renter.name,
                'renter_image': image_url,
                'amount': rental_request.rent_price,
                'start_date': rental_request.start_date,
                'end_date': rental_request.end_date,
                'requested_size': rental_request.rental_size,
            })

        
        if not response_data:
            return Response(
                {'message': 'No valid pending storehouse rental requests available.'},
                status=200
            )

        return Response({'pending_requests': response_data}, status=200)





class UpdateStorehouseRentalStatusView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)

        rental_id = request.data.get('rental_id')
        if not rental_id:
            return Response({'error': 'Rental ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        
        storehouse_rental = get_object_or_404(StorehousesRental, rental_id=rental_id, storehouse__owner=user)

        new_status = request.data.get('status')
        if new_status not in ['Accept', 'Reject']:
            return Response({'error': 'Invalid status. Must be either "Accept" or "Reject".'}, status=status.HTTP_400_BAD_REQUEST)


        current_time = timezone.now().date()

        storehouse = storehouse_rental.storehouse
        accepted_rentals = StorehousesRental.objects.filter(
            storehouse=storehouse,
            status='Accept',
            end_date__gte=current_time, 
            active=True
        )

        total_rented_size = sum(rental.rental_size for rental in accepted_rentals)
        available_size = storehouse.total_size - total_rented_size

        if new_status == 'Accept':
            requested_size = storehouse_rental.rental_size

            if float(requested_size) > available_size:
                next_available_rental = accepted_rentals.order_by('end_date').first()
                next_available_date = next_available_rental.end_date if next_available_rental else None

                return Response({
                    'error': 'Insufficient space available in the storehouse.',
                    'available_size': available_size,
                    'next_available_date': next_available_date,  
                }, status=status.HTTP_400_BAD_REQUEST)

            storehouse_rental.status = 'Accept'

        elif new_status == 'Reject':
            storehouse_rental.status = 'Reject'
            storehouse_rental.active = False

        storehouse_rental.save()


        return Response({
            'message': f'Rental request {new_status.lower()}ed successfully.',
            'rental_id': storehouse_rental.rental_id,
            'status': storehouse_rental.status,
            'available_size': available_size,
            'active': storehouse_rental.active
        }, status=status.HTTP_200_OK)




class UserStorehouseInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(DbUser, email=request.user.email)
        storehouse_info = Storehouses.objects.filter(owner=user).first()

        if storehouse_info is None:
            response_data = {
                "owner_name": user.name,
                "name": None,
                "descriptions": None,
                "size": None,
                "available_size": None,
                "region_name": user.region.name if user.region else None,
                "owner_phone_number": user.number,
                "temperature_range": None,
                "rent_per_sq": None,
                "location": None,
                "upcoming_rentals": []  
            }
        else:
            
            total_rented_size = StorehousesRental.objects.filter(
                storehouse=storehouse_info,
                status='Accept'
            )
            total_rented_size = sum(rental.rental_size for rental in total_rented_size)
            available_size = storehouse_info.total_size - total_rented_size

            upcoming_rentals = StorehousesRental.objects.filter(
                storehouse=storehouse_info,
                status='Accept',
                start_date__gt=date.today()  
            )

            upcoming_rentals_data = [
                {
                    "rental_id": rental.rental_id,
                    "start_date": rental.start_date,
                    "end_date": rental.end_date,
                    "rental_size": rental.rental_size,
                    "rent_price": rental.rent_price,
                    "renter_name": rental.renter.name if rental.renter else None  
                }
                for rental in upcoming_rentals
            ]

            response_data = {
                "owner_name": user.name,
                "name": storehouse_info.name,
                "descriptions": storehouse_info.descriptions,
                "size": storehouse_info.total_size,
                "available_size": available_size,
                "region_name": user.region.name if user.region else None,
                "owner_phone_number": user.number,
                "temperature_range": storehouse_info.temperature_range,
                "rent_per_sq": storehouse_info.rent_per_sq,
                "status": storehouse_info.status,
                "location": storehouse_info.location,
                "upcoming_rentals": upcoming_rentals_data  
            }

        return Response(response_data, status=status.HTTP_200_OK)




class StorehouseDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, storehouse_id, *args, **kwargs):
        # Retrieve the storehouse based on the provided storehouse ID
        storehouse = get_object_or_404(Storehouses, storehouse_id=storehouse_id, active=1)

        # Retrieve the owner of the storehouse
        owner = storehouse.owner

        # Build the response data
        storehouse_data = {
            "storehouse_id": storehouse.storehouse_id,
            "name": storehouse.name,
            "temperature_range": storehouse.temperature_range,
            "location": storehouse.location,
            "rent_per_sq": str(storehouse.rent_per_sq),
            "total_size": str(storehouse.total_size),
            "status": storehouse.status,
            "descriptions": storehouse.descriptions,
            "owner.name,":owner.name,
            "owner_contact":owner.number,
        }

        return Response(storehouse_data, status=200)