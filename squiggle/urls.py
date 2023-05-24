from django.urls import path
from . import views
from .views import create_design, design_list, create_order, order_list, view_order

urlpatterns = [
    path('design/create/', views.create_design, name='create_design'),
    path('design/list/', views.design_list, name='design_list'),
    path('order/create/', views.create_order, name='create_order'),
    path('order/list/', views.order_list, name='order_list'),
]

