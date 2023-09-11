from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser
from django.utils.translation import gettext as _
from .managers import CustomUserManager
from rest_framework_simplejwt.tokens import RefreshToken




# Create your models here.


class UserRegister(AbstractBaseUser):
    full_name = models.CharField(max_length=50,)
    email = models.EmailField(_('email address'),max_length=100, unique=True)
    contact = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    address = models.CharField(max_length=1000)
    role = models.CharField(max_length=20,default='user')
    status = models.BooleanField(default=False)

    objects = CustomUserManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)


    def __str__(self):
        return self.email



    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    # def has_module_perms(self, app_label):
    #     "Does the user have permissions to view the app `app_label`?"
    #     # Simplest possible answer: Yes, always
    #     return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return True
