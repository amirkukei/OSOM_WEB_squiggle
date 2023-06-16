from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import index, design_list, create_order, order_list, view_order, about

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('design/list/', views.design_list, name='design_list'),
    path('order/create/', views.create_order, name='create_order'),
    path('order/list/', views.order_list, name='order_list'),
#    path('login/', views.user_login, name='login'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    path('password-change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password-change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),
    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset//<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset/complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('register/', views.register, name='register'),
]

