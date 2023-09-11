from rest_framework import serializers
from .models import *


class CategoriesSerializers(serializers.ModelSerializer):

    name = serializers.CharField(max_length=200)
    # created_by = serializers.ReadOnlyField(source='creator.id')
    # cat_icon = serializers.ImageField(required=False)

    class Meta:
        model = Categories
        fields = ['id', 'name']




class SubcategorySerializers(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    category_id = serializers.CharField(max_length=1000000)

    # category = serializers.ReadOnlyField(source='Categories.id')
    class Meta:
        model = SubCategory
        # fields = "__all__"
        fields = ['id','name','category_id']
        # lookup_field = 'category'

class ProductSerializers(serializers.ModelSerializer):
    subcategory_id = serializers.IntegerField()
    category_id = serializers.IntegerField()
    product_image = serializers.ImageField()
    name = serializers.CharField(max_length=200)
    product_detail = serializers.CharField(max_length=200)
    product_price = serializers.FloatField()
    class Meta:
        model = Product
        fields = ['id','name','brand','subcategory_id','product_detail','product_price','product_image','category_id']
