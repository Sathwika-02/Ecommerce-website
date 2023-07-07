import hashlib
from django.shortcuts import render
from django.shortcuts import render
from django.core.cache import cache


# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ecomm.authenticate import MyUserBackend
from .serializers import  FAQSerializer, LoginSerializer, MyUserSerializer, OrderSerializer, ProductVariantSerializer
from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import random
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.core.mail import send_mail

class TokenVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            authentication = JWTAuthentication()
            token = authentication.get_validated_token(request)
        except InvalidToken:
            return Response({'error': 'Invalid token'}, status=401)

        # Token is valid, you can perform further actions here

        return Response({'message': 'Token is valid'}, status=200)


class DemoView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        print(request.user)
        return Response({"success":"You are authenticated"})
    ()


@authentication_classes([])
@permission_classes([AllowAny])
class SignupView(APIView):
    def post(self, request):
        serializer = MyUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = str(random.randint(100000, 999999))
            print(otp)
            cache.set(f"otp:{user.email}", otp, timeout=300)
            #user.otp = otp
            #user.save()
            send_mail(
                'OTP Verification',
                f'Your OTP is: {otp}',
                'madarapusathwika9@gmail.com',
                [user.email],
                fail_silently=False,
            )
            tokens = get_tokens_for_user(user)
            response_data = {
                'message': 'User created successfully.',
                'tokens': tokens
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login
from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ecomm.models import MyUser
from django.contrib.auth import login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.http import Http404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.exceptions import NotFound
from .serializers import LoginSerializer
from .models import  Address, Faq, MyUser, Order, ProductVariant
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,password)
        

        user = MyUserBackend().authenticate(request, username=username, password=password)
        print(user)

        if user is not None:
             return Response('Login Successfull')
        else:
            return Response({'error': 'Invalid username or password'}, status=400)
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer

class ProductView(APIView):
    permission_classes=[AllowAny]
    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request,pk=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
from rest_framework.generics import RetrieveAPIView
class ProductDetailView(RetrieveAPIView):
    permission_classes=[AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
class ProductCatView(APIView):
    authentication_classes = []  # Empty list to allow unauthenticated access
    permission_classes = [AllowAny]  # Allow any user to access the endpoint

    def get(self, request, category):
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductTitleView(APIView):
    authentication_classes = []  # Empty list to allow unauthenticated access
    permission_classes = [AllowAny]  # Allow any user to access the endpoint

    def get(self, request,title):
        products = Product.objects.filter(title=title)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
"""
def add_to_cart(request,id):
    product=Product.objects.get(id=id)
    user=request.user
    cart,_=Cart.objects.get_or_create(user=user,is_paid=False)
    cart_items=CartItem.objects.create(cart=cart,product=product)
    cart_items.save()"""


    


from django.shortcuts import get_object_or_404

class CheckAuthView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Authenticated'})
    
from rest_framework import status
# views.py
from .models import  MyUser, Product

from rest_framework import generics

def _cart_id(request):
    cart=request.session.session_key
    if not cart:
        cart=request.session.create()
    return cart
from django.http import JsonResponse
from rest_framework.decorators import api_view


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def order_list(request):
 if request.method == 'GET':
     orders = Order.objects.all().values()

     return JsonResponse(list(orders), safe=False)
 
 if request.method == 'POST':
     orderserializer = OrderSerializer(data = request.data)
     if(orderserializer.is_valid()):
         orderserializer.save()
         return HttpResponse({'message': 'Order created successfully'})
     
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import MyUser

class OTPVerifyView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        email = request.data.get('email')
        entered_otp = request.data.get('otp')

        try:
            user = MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        #stored_otp = user.otp
        stored_otp = cache.get(f"otp:{user.email}")
        #print("Stored")
        #print(type(stored_otp))
        
        if int(stored_otp) ==entered_otp:
            print("Both are equal")
            return Response({'message': 'OTP verification successful.'}, status=status.HTTP_200_OK)
        else:
            print("Both are not equal")
            return Response({'message': 'Incorrect OTP.'}, status=status.HTTP_400_BAD_REQUEST)
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.views import APIView
import secrets
import string

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ResetPasswordView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        email = request.data.get('email')
        print(email)

        try:
            user = MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            return Response({'message': 'Invalid email address.'}, status=status.HTTP_400_BAD_REQUEST)

        token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(20))
        hashed_token = hashlib.sha256(token.encode()).hexdigest()
        final_reset_url = f'http://localhost:4200/forgotpassword/{hashed_token}'
        user.password_reset_token = hashed_token
        user.save()
        send_mail(
            'Password Reset',
            f'Click the following link to reset your password: <a href="{final_reset_url}">{final_reset_url}</a>',
            'madarapusathwika9@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'Click the following link to reset your password: <a href="{final_reset_url}">{final_reset_url}</a>'
        )

        return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
    

from django.contrib.auth.tokens import default_token_generator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework import status

from .models import MyUser
class UpdatePasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.query_params.get('token')  # Get the token from the query parameter
        password = request.data.get('password')
        
        if not token:
            return Response({'message': 'Token is missing.'}, status=status.HTTP_400_BAD_REQUEST)

        user = self.get_user_from_token(token)
        if not user:
            return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        
        user.password=password
        user.password_reset_token = None  
        user.save()

        return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)

    def get_user_from_token(self, token):
        try:
            user = MyUser.objects.get(password_reset_token=token)
            return user
        except MyUser.DoesNotExist:
            return None

from django.http import JsonResponse
from .models import Review
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Review
from .serializers import ReviewSerializer

class SubmitReviewView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        product_title = request.data.get('productTitle')
        author = request.data.get('author')
        rating = request.data.get('rating')
        comment = request.data.get('comment')
        media = request.data.get('media')
        serializer = ReviewSerializer(data={
        'product_title': product_title,
        'author': author,
        'rating': rating,
        'comment': comment,
        'media': media
    })

        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


from rest_framework import generics

class ReviewListView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,productTitle):
        queryset = Review.objects.filter(product_title=productTitle)
        serialzer=ReviewSerializer(queryset,many=True)
        return Response(serialzer.data)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import status

"""
class SubmitFAQView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = FAQSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""

class SubmitFAQView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        product_title = request.data.get('productTitle')
        question= request.data.get('question')
        answer= request.data.get('answer')
        status= request.data.get('status')
        serializer = FAQSerializer(data={
        'product_title': product_title,
        'question': question,
        'answer': answer,
        'status': status
    })

        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=201)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=400)
    
    def get(self, request):
        queryset = Faq.objects.all()
        serializer = FAQSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def put(self, request):
        data = request.data.get('faqs')
        for item in data:
            question = item.get('question')
            answer = item.get('answer')
            faqs = Faq.objects.filter(question=question)
            for faq in faqs:
                faq.answer = answer
                faq.status = 'answered' 
                faq.save()
        return Response("FAQs updated successfully", status=200)


class FAQListView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,productTitle):
        queryset = Faq.objects.filter(product_title=productTitle,status='answered')
        serialzer=FAQSerializer(queryset,many=True)
        return Response(serialzer.data)

class ProductVariantView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = ProductVariantSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request, pk=None):
        variants = ProductVariant.objects.all()
        serializer = ProductVariantSerializer(variants, many=True)
        return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AddressSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def create_address(request):
    serializer = AddressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_addresses(request):
    addresses = Address.objects.filter(user=request.user)
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def add_list(request):
 if request.method == 'GET':
     orders =Address.objects.all().values()

     return JsonResponse(list(orders), safe=False)
 
 if request.method == 'POST':
     orderserializer = AddressSerializer(data = request.data)
     if(orderserializer.is_valid()):
         orderserializer.save()
         return HttpResponse({'message': 'Order created successfully'})