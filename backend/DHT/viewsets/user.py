from ..models import User
from ..serializers import UserSerializer
from django.contrib.auth import login
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
    
    @action(methods=['POST'],detail=False, url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)
        user = authenticate(email=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid email or password')
        return Response({'message': 'Logged In Successfuly!'})