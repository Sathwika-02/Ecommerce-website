from django.db import models

# Create your models here.
import json

class MyUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=100)
    otp = models.IntegerField(null=True)
    password_reset_token = models.CharField(max_length=255, null=True)

    

    def __str__(self):
        return self.email

class SmallImage(models.Model):
    smallImage = models.URLField()

    def __str__(self):
        return f"Small Image {self.id}"

class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image = models.URLField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    popularity = models.IntegerField()
    color=models.CharField(max_length=100)
    smallImages = models.ManyToManyField(SmallImage, related_name='products', blank=True)
    discount = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    delivery_day = models.IntegerField(default=0)

    def __str__(self):
        return self.title
"""  
class CartItem(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE,unique=True)
    products = models.ManyToManyField(Product)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"Cart Item - User: {self.user.email}, Quantity: {self.quantity}"

    def calculate_price(self):
        total_price = 0

        for product in self.products.all():
            total_price += product.price * self.quantity

        return total_price

"""
from django.db import models


class Order(models.Model):
    user=models.CharField(max_length=50,null=True)
    id=models.AutoField(primary_key=True)
    name= models.CharField(max_length=100)
    unitPrice = models.DecimalField(max_digits=8, decimal_places=2)
    quantity=models.IntegerField(default=1)
    imageUrl = models.URLField()


class Review(models.Model):
    product_title = models.CharField(max_length=100,null=True)  
    author = models.CharField(max_length=255)
    rating = models.IntegerField()
    comment = models.TextField()
    media= models.FileField(upload_to='media/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.author}'

class Faq(models.Model):
    product_title = models.CharField(max_length=100,null=True) 
    question = models.CharField(max_length=255)
    answer = models.TextField()
    status = models.CharField(max_length=20, default='pending')

    def __str__(self):
        return self.question


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color = models.CharField(max_length=100)
    image = models.URLField()
    smallImages = models.ManyToManyField(SmallImage, related_name='variants', blank=True)


class Address(models.Model):
    user=models.CharField(max_length=50,null=True)
    fullName = models.CharField(max_length=255)
    addressLine1 = models.CharField(max_length=255)
    addressLine2 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zipCode = models.CharField(max_length=10)

    def __str__(self):
        return self.fullName