from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView
from .views import OrderCreateAPIView
from .views import RegisterAPIView
from .views import OrderListAPIView

urlpatterns = [
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
]

urlpatterns += [
    path('orders/', OrderCreateAPIView.as_view(), name='order-create'),
]

urlpatterns += [
    path('register/', RegisterAPIView.as_view(), name='register'),
]

urlpatterns += [
    path('orders/all/', OrderListAPIView.as_view(), name='order-list'),
]