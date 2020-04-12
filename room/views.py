from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from . import models, serializers
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


class ListRoomView(generics.ListAPIView):
    """ A class to handle listing and creation of new Rooms. """
    queryset = models.Room.objects.all()
    permission_classes = ()
    serializer_class = serializers.RoomSerializer
    authentication_classes = ()


class CreateRoomView(generics.CreateAPIView):
    """A class to enable admin user to add rooms to the system. """
    queryset = models.Room.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.RoomSerializer


class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    """ A class to handle listing and creation of new Rooms. """
    queryset = models.Room.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.RoomSerializer


class CategoryAPIView(generics.ListCreateAPIView, generics.GenericAPIView):
    """ A class to handle category creation. """
    queryset = models.RoomCategory.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = serializers.RoomCategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView, generics.GenericAPIView):
    """ A class to handle category creation. """
    queryset = models.RoomCategory.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = serializers.RoomCategorySerializer