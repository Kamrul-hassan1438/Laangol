
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from API.views import ProductCreateView,UpdateProductView, TopProductsView,RecentProductsView
from API.views import InventoryView, CartView ,CheckoutView,RemoveCartItemView
from API.views import AddCart, MoreProductsView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', ProductCreateView.as_view(), name='product-create'),
    path('api/products/<int:product_id>/update/', UpdateProductView.as_view(), name='update-product'),
    path('api/top-products/', TopProductsView.as_view(), name='top-products'),
    path('api/recent-products/', RecentProductsView.as_view(), name='recent-products'),
    
    path('Add-cart/', AddCart.as_view(), name='ADD-Cart'),
    path('cart/', CartView.as_view(), name='CartView'),
    path('RemoveCartItem/', RemoveCartItemView.as_view(), name='RemoveCartItem'),
    path('cart/CheckoutView/', CheckoutView.as_view(), name='Checkout'),
    path('inventory/', InventoryView.as_view(), name='inventory-view'),


    path('Moreproducts/<int:product_id>/', MoreProductsView.as_view(), name='user-products'),



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)