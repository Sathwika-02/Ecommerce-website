from rest_framework import serializers
from .models import   Address, MyUser, Order, ProductVariant

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['first_name', 'last_name', 'username', 'email', 'password']

from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()


from rest_framework import serializers
from .models import Product,SmallImage

from rest_framework import serializers
class SmallImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallImage
        fields = ['smallImage']

class ProductSerializer(serializers.ModelSerializer):
    smallImages = SmallImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'category', 'image', 'rating', 'popularity', 'smallImages','discount','delivery_day','color']

    def create(self, validated_data):
        small_images_data = validated_data.pop('smallImages', [])
        product = Product.objects.create(**validated_data)
        for small_image_data in small_images_data:
            small_image = SmallImage.objects.create(**small_image_data)
            product.smallImages.add(small_image)
        return product


# serializers.py
class OrderSerializer(serializers.ModelSerializer):

     class Meta:
        model = Order
        fields = ['user','id', 'name', 'unitPrice','quantity','imageUrl']


from rest_framework import serializers
from .models import Review,Faq
class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ('product_title', 'author', 'rating', 'comment', 'media')

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = ['product_title', 'question', 'answer', 'status']

class ProductVariantSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title')
    price = serializers.DecimalField(source='product.price', max_digits=8, decimal_places=2)
    description = serializers.CharField(source='product.description')
    category = serializers.CharField(source='product.category')
    smallImages = SmallImageSerializer(many=True)

    class Meta:
        model = ProductVariant
        fields = ['product_title', 'price', 'description', 'category', 'color', 'image', 'smallImages']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'