from django.urls import path
from . import views
from .views import index, design_list, create_order, order_list, view_order, about

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('design/list/', views.design_list, name='design_list'),
    path('order/create/', views.create_order, name='create_order'),
    path('order/list/', views.order_list, name='order_list'),
]

