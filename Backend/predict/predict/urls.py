from django.contrib import admin
from django.urls import path, include
from KNN.views import CropPricePredictionView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('predict/', CropPricePredictionView.as_view(), name='predict-crop-price'),
]
