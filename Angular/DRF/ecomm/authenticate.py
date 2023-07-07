from django.contrib.auth.backends import BaseBackend
from .models import MyUser
from django.contrib.auth.hashers import check_password as django_check_password
from django.contrib.auth.hashers import make_password
class MyUserBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = MyUser.objects.get(username=username)
            if user.password == password:
                return user
        except MyUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return MyUser.objects.get(pk=user_id)
        except MyUser.DoesNotExist:
            return None