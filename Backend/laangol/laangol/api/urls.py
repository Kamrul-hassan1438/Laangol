from rest_framework.routers import DefaultRouter
from  verify.api.urls import router
from django.urls import path , include

corerouter=DefaultRouter()
corerouter.registry.extend(router.registry)

urlpatterns = [
    path('',include(corerouter.urls)),
   
]
