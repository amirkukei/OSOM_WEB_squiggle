from django.shortcuts import render, redirect
from .models import Design, Order

def index(request):
    if request.method == 'POST':
        return redirect('design_list')
    else:
        return render(request, 'static/index.html')

def design_list(request):
    designs = Design.objects.all()
    return render(request, 'design_list.html', {'designs': designs})

def create_order(request):
    if request.method == 'POST':
        return redirect('order_list')
    else:
        return render(request, 'create_order.html')

def order_list(request):
    orders = Order.objects.all()
    return render(request, 'order_list.html', {'orders': orders})

def view_order(request, order_id):
    order = Order.objects.get(id=order_id)
    return render(request, 'view_order.html', {'order': order})
