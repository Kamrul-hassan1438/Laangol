
from django.contrib import admin
from django.urls import path
from knn_app.views import ForecastPriceView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('forecast/', ForecastPriceView.as_view(), name='forecast_price'),
]
