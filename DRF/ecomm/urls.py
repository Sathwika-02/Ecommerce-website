from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from ecomm.views import OTPVerifyView,DemoView,LoginView,ProductCatView, ProductDetailView, ProductView, SignupView,CheckAuthView,order_list, UpdatePasswordView,ResetPasswordView,SubmitReviewView,ReviewListView,SubmitFAQView,FAQListView,ProductVariantView,ProductTitleView,create_address,get_addresses,add_list
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
     path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductView.as_view(), name='product-view'),
     path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
     path('products/<str:category>/', ProductCatView.as_view(), name='product-details'),
     path('product/<str:title>/',ProductTitleView.as_view()),
       path('auth/check/', CheckAuthView.as_view()),  # Add this line
     #  path('add-to-cart/', AddToCartView.as_view(),name='add_to_cart'),
      #path('view-cart/<str:user_email>/', CartView.as_view(), name='view-cart'),
      #path('carts',ListCart.as_view(),name='cart'),
      path('demo/',DemoView.as_view()),
      path('order/',order_list),
      path('otp/',OTPVerifyView.as_view()),
      path('update-password/', UpdatePasswordView.as_view(), name='update_password'),
      path('resetpassword',ResetPasswordView.as_view()),
      path('review/',SubmitReviewView.as_view()),
      path('reviewlist/<str:productTitle>/', ReviewListView.as_view(), name='fetch-review'),
      path('faqs/',SubmitFAQView.as_view()),
      path('faqs/<str:productTitle>/',FAQListView.as_view()),
      path('product-variants/', ProductVariantView.as_view(), name='product_variant_list'),
      path('addresses/', add_list),
      path('address/',get_addresses),

     
       
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)