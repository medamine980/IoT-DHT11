from ..models import User
from ..serializers import UserSerializer, LoginSerializer
from ..authentication.csrf_exempt_session_authentication import CsrfExemptSessionAuthentication
from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework.authentication import BasicAuthentication 

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def get_permissions(self):
        if self.action in ['login', 'logout']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(methods=['GET', 'POST'],detail=False, url_path='login', serializer_class=LoginSerializer)
    def login(self, request):
        if request.method == 'GET':
            return Response({
                "description": "Log in with email and password",
                "fields": {
                    "email": {"type": "string", "required": True},
                    "password": {"type": "string", "required": True},
                }
            }, status=status.HTTP_200_OK)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid email or password')
        login(request, user)  # This creates a session
        print(request.user.is_authenticated)
        return Response({'message': 'Logged In Successfuly!'})
    

    @action(methods=['GET'],detail=False, url_path='logout')
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logged out Successfuly!'}, status=200)
    
    @action(methods=['GET'], detail=False, url_path='current-user')
    def current_user(self, request):
        return Response(self.serializer_class(request.user).data, status=200)