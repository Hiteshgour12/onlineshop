from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from rest_framework.views import APIView
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from rest_framework.response import Response
from rest_framework import status, generics, authentication, exceptions
import jwt
from django.conf import settings




# Create your views here.




class UserRegistrationView(generics.GenericAPIView):
    serializer_class = UserRegistrationsSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request, format=None):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = UserRegister.objects.get(email=user_data['email'])

        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')

        absurl = 'http://' + current_site + relativeLink + '?token=' + str(token)
        email_body = 'Hi ' + user.email + 'Use link below to verify email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email, 'subject': 'Verify your email'}

        Util.send_email(data)
        # Tenant_Registration.objects.create(signup_id=user)
        #
        #
        # tenant_data = Tenant_Registration.objects.get(signup_id=user)
        # print(tenant_data)
        # # user_data = user
        #
        # Staff_Register.objects.create(tenant=tenant_data, auth=user)
        # print('success',user)

        return Response(user_data, status=status.HTTP_201_CREATED)



class VerifyEmail(generics.GenericAPIView):

    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            print('payload 1 ' + str(payload))
            # payload = jwt.decode(token, settings.SECRET_KEY)
            user = UserRegister.objects.get(id=payload['user_id'])
            if not user.status:
                user.status = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        # if valid:
        #     status_code = status.HTTP_200_OK
        #
        #     response = {
        #         'success': True,
        #         'statusCode': status_code,
        #         'message': 'User logged in successfully',
        #         'access': serializer.data['access'],
        #         'refresh': serializer.data['refresh'],
        #
        #         'authenticatedUser': {
        #             'email': serializer.data['email'],
        #             'role': serializer.data['role']
        #         }
        #     }

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserListView(generics.GenericAPIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user.role != 'admin':
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = UserRegister.objects.filter(role='user')
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data

            }
            return Response(response, status=status.HTTP_200_OK)