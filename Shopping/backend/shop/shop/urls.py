from django.urls import path
from .views import *


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path('userlogin/',UserLoginView.as_view(),name='Login'),
    path('userlist/',UserListView.as_view(),name='users')
    # path('TenantRegister/',Tenant_RegistrationView.as_view(), name = 'Tenant Register'),
    # path('TenantUpdate/',TenantUpdateAPIView.as_view(), name= 'Tenant Update'),
    # # path('staffRegister/',Staff_RegisterView.as_view(), name = 'staff Register')
    # # path('staffRegister/',StaffSignup.as_view(), name = 'staff Register'),
    # path('staff/',StaffView.as_view(), name = 'staff'),
    # path('staffview/', ProfileListApiView.as_view()),  # User User_profile View by Admin User
    # path('individualview/', IndividualProfileApiView.as_view()),  # User User_profile View by User
    # path('staffupdate/',StaffUpdateView.as_view(), name = 'Staff Update')


]
