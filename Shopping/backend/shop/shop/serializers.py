from rest_framework import serializers,exceptions
from .models import *
from django.contrib import auth




class UserRegistrationsSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = UserRegister
        fields = ['full_name','email', 'password','password2','contact','city','gender','address']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = UserRegister(
            email=self.validated_data['email']
        )
        full_name = self.validated_data['full_name']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        contact = self.validated_data['contact']
        city = self.validated_data['city']
        gender = self.validated_data['gender']
        address = self.validated_data['address']

        if password != password2:
            raise serializers.ValidationError({"error": "Password doest not match"})
        user.set_password(password)
        user.full_name=full_name
        user.contact=contact
        user.city=city
        user.gender=gender
        user.address=address
        user.save()
        # Tenant_Registration.objects.create(signup_id=user)
        return user


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = UserRegister
        fields = ['token']




class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)
    tokens = serializers.SerializerMethodField()
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def get_tokens(self, obj):
        user = UserRegister.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = UserRegister
        fields = ['email', 'password', 'tokens','role']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        # filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)

        # if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
        #     raise AuthenticationFailed(
        #         detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not user:
            raise exceptions.AuthenticationFailed('Invalid credentials, Try again')

        if not user.status:
            raise exceptions.AuthenticationFailed('Email is not verified')


        return {
            'email': user.email,
            'tokens': user.tokens,
            'role': user.role,

        }

        return super().validate(attrs)

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = (
            'id',
            'full_name',
            'email',
            'contact',
            'city',
            'gender',
            'address',
            'status',
            'role'
        )