import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import Design, Order, Drawing
from .forms import LoginForm, UserRegistrationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import requests
import xml.etree.ElementTree as ET
import json
from django.core.serializers.json import DjangoJSONEncoder

def index(request):
    if request.method == 'POST':
        return redirect('design_list')
    else:
        return render(request, 'index.html')

def get_background_color(request):
    if request.method == 'GET':
        response = requests.get('https://www.thecolorapi.com/random')
        if response.status_code == 200:
            data = response.json()
            background_color = data['hex']['value']
            return JsonResponse({'background_color': background_color})

    return JsonResponse({'error': 'Unable to fetch background color'})


def about(request):
    return render(request, 'about.html')


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


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd['username'], password=cd['password'])
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                return HttpResponse('Something went wrong')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            return render(request, 'register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'register.html', {'user_form': user_form})

def logout_view(request):
    logout(request)
    return redirect("index")

def save_canvas(request):
    if request.method == 'POST':
        drawing_data = request.body

        drawing = Drawing(drawing_data=drawing_data, email=request.user.email, name="New Design")
        drawing.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def gallery(request):
    drawings = Drawing.objects.filter(email=request.user.email)
    return render(request, 'gallery.html', {'drawings': drawings})


def load_drawings(request):
    if request.method == 'GET':
        email = request.user.email
        drawings = Drawing.objects.filter(email=email)

        drawing_list = [{'drawing_data': drawing.drawing_data} for drawing in drawings]
        return JsonResponse(drawing_list, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})


from django.http import JsonResponse

def delete_drawing(request, drawing_id):
    if request.method == 'DELETE':
        try:
            drawing = Drawing.objects.get(id=drawing_id)
            drawing.delete()
            return JsonResponse({'success': True})
        except Drawing.DoesNotExist:
            return JsonResponse({'error': 'Drawing not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def update_drawing(request, drawing_id):
    if request.method == 'PUT':
        try:
            drawing = Drawing.objects.get(id=drawing_id)
            data = json.loads(request.body)
            new_name = data.get('name')

            if new_name:
                drawing.name = new_name
                drawing.save()

                return JsonResponse({'success': True})
            else:
                return JsonResponse({'error': 'Invalid data'}, status=400)
        except Drawing.DoesNotExist:
            return JsonResponse({'error': 'Drawing not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)




