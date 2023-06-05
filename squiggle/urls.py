from django.urls import path
from . import views
from .views import index, design_list, create_order, order_list, view_order

urlpatterns = [
    path('', views.index, name='index'),
    path('design/list/', views.design_list, name='design_list'),
    path('order/create/', views.create_order, name='create_order'),
    path('order/list/', views.order_list, name='order_list'),
]

