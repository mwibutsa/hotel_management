from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsAccountOwner
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, AuthTokenSerializer
from django.contrib.auth import get_user_model


class BaseUserView(generics.GenericAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListCreateAPIView, BaseUserView):
    """APIView to handle user creation and deletion. """

    permission_classes = (IsAdminUser,)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView, BaseUserView):
    """APIView to handle user creation and deletion. """

    permission_classes = (IsAdminUser,)


class ProfilesListView(generics.ListAPIView, BaseUserView):
    permission_classes = (IsAuthenticated,)


class UpdateUserAPIView(generics.RetrieveUpdateAPIView, BaseUserView):
    """ APIView to handle user retrieval and update. """

    permission_classes = (IsAuthenticated, IsAccountOwner)


class LoginAPIView(TokenObtainPairView):
    serializer_class = AuthTokenSerializer
    permission_classes = ()
