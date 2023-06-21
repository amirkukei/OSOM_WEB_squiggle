import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import Design, Order, Drawing
from .forms import LoginForm, UserRegistrationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


def index(request):
    if request.method == 'POST':
        return redirect('design_list')
    else:
        return render(request, 'index.html')


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


def save_canvas(request):
    if request.method == 'POST':
        # drawing_data = request.POST.get('drawingData')
        drawing_data = request.body

        # Save the drawing data to the database
        drawing = Drawing(drawing_data=drawing_data, email=request.user.email)
        drawing.save()

        return JsonResponse({'success': True})
        # return render(request, 'index.html')
    else:
        return JsonResponse({'error': 'Invalid request method'})


def logout_view(request):
    logout(request)
    return redirect("index")


def load_drawings(request):
    if request.method == 'GET':
        email = request.user.email
        drawings = Drawing.objects.filter(email=email)

        drawing_list = list(drawings.values())

        # Serialize as JSON
        drawings_json = json.dumps(drawing_list, cls=DjangoJSONEncoder)

        # Return JSON response
        return JsonResponse(drawings_json, safe=False)

