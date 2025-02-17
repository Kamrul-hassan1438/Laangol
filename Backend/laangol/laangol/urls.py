from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include
from verify import views
from update.views import UpdateUserView,UserInfoView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('verify.api.urls')),
    path('api/',include('laangol.api.urls')),
    path('signup/', views.signup),
    path('login/', views.login),
    path('gettoken/', views.gettoken),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
