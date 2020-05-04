from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsAccountOwner, IsSuperUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, AuthTokenSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status


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


class DeactivateUserApiView(generics.DestroyAPIView, BaseUserView):
    """Allow super user to deactivate staff member accounts. """

    permission_classes = (IsAuthenticated, IsSuperUser)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        serializer = self.get_serializer(instance)

        return Response(data={"message": f"User {instance.email} is successfully deactivated.", "data": serializer.data},
                        status=status.HTTP_200_OK)


class LoginAPIView(TokenObtainPairView):
    serializer_class = AuthTokenSerializer
    permission_classes = ()
