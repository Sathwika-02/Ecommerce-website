from django.contrib import admin

# Register your models here.
from ecomm.models import MyUser,SmallImage,Product,Order,Review,Faq,ProductVariant,Address
admin.site.register(MyUser)
admin.site.register(SmallImage)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Review)
admin.site.register(Faq)
admin.site.register(ProductVariant)
admin.site.register(Address)

from django.contrib.auth.models import Group

admin_group, _ = Group.objects.get_or_create(name='Admin')

user_group, _ = Group.objects.get_or_create(name='User')
