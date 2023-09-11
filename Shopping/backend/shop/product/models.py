from django.db import models
from shop.models import *
from product.models import *
# from PIL import ImageTk, Image
# Create your models here.

class Categories(models.Model):
    name = models.CharField(max_length=200, unique=True)
    created_by = models.ForeignKey(UserRegister, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    status = [
        ('in stock', 'in stock'),
        ('out of stock', 'out of stock'),
    ]
    name = models.CharField(max_length=200, unique=True)
    brand = models.CharField(max_length=200)
    product_detail= models.CharField(max_length=200)
    product_price = models.FloatField(max_length=20)
    product_image = models.ImageField(null=True,blank = True,upload_to="images/")
    product_status = models.CharField(choices=status, max_length=200, default='in stock')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE,null=True,blank=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    

