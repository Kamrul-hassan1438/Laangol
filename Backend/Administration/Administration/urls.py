from django.contrib import admin
from django.urls import path
from Admin.views import AdminOnlyView,AdminUserListView,UserCountView,AllUsersView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),
    path('admin-users/', AdminUserListView.as_view(), name='admin_user_list'),
    path('user-count/', UserCountView.as_view(), name='user-count'),
    path('all-users/', AllUsersView.as_view(), name='all-users'),
]
