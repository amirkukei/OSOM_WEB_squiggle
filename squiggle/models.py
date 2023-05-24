from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
    contact_number = models.CharField(max_length=20)
    email = models.CharField(max_length=50)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #tshirts = models.ManyToManyField()
    status = models.CharField(max_length=20)
    total_cost = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)


class Design(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='designs/')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Tshirt(models.Model):
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    design = models.ForeignKey(Design, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)