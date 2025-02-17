from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from hire.views import AddLabourView,LabourByRegionView,LabourHireView,PendingHireRequestsView,UpdateHireStatusView
from info.views import LabourProfileView
from hire.views import UserLabourInfoView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/add-labour/', AddLabourView.as_view(), name='add_labour'),
    path('user/labour-info/', UserLabourInfoView.as_view(), name='user_labour_info'),
    path('laborers/by-region/', LabourByRegionView.as_view(), name='laborers-by-region'),
    path('api/labour/hire/', LabourHireView.as_view(), name='labour-hire'),
    path('api/pending-hire-requests/', PendingHireRequestsView.as_view(), name='pending_hire_requests'),
    path('api/update-hire-status/', UpdateHireStatusView.as_view(), name='update-hire-status'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
