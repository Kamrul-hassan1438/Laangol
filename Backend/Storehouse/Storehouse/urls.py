from django.contrib import admin
from django.urls import path

from rent.views import AddStorehouseView,StorehousesByRegionView,StorehouseRentalView,PendingStorehouseRequestsView,UpdateStorehouseRentalStatusView
from rent.views import UserStorehouseInfoView,StorehouseDetailView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/storehouse-info/', UserStorehouseInfoView.as_view(), name='UserStorehouseInfoView'),
    path('storehouse/add/', AddStorehouseView.as_view(), name='AddStorehouse'),
    path('storehouse/by-region/', StorehousesByRegionView.as_view(), name='storehouse-by-region/'),

    path('storehouse/rent/', StorehouseRentalView.as_view(), name='storehouse-rent'),

    path('storehouse/pending-requests/', PendingStorehouseRequestsView.as_view(), name='storehouse-requests/'),

    path('update-storehouse-pending-status/', UpdateStorehouseRentalStatusView.as_view(), name='update-status/'),

     path('storehouse/<int:storehouse_id>/details/', StorehouseDetailView.as_view(), name='storehouse-details'),

]
