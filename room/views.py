from rest_framework import generics
from . import models, serializers
from rest_framework.permissions import IsAdminUser


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


class CategoryListView(generics.ListAPIView, generics.GenericAPIView):
    """ A class to handle category listing for the clients. """
    queryset = models.RoomCategory.objects.all()
    serializer_class = serializers.RoomCategorySerializer
    authentication_classes = ()


class CategoryAPIView(generics.ListCreateAPIView, generics.GenericAPIView):
    """ A class to handle category creation. """
    queryset = models.RoomCategory.objects.all()
    serializer_class = serializers.RoomCategorySerializer
    authentication_classes = ()


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView,
                         generics.GenericAPIView):
    """ A class to handle category creation. """
    queryset = models.RoomCategory.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = serializers.RoomCategorySerializer
