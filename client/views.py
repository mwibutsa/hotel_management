from rest_framework import viewsets, generics
from . import models
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from . import serializers


class BaseClientView:
    queryset = models.HotelClient.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.HotelClientSerializer


class ClientListView(generics.ListAPIView, BaseClientView,
                     viewsets.GenericViewSet):
    """List all clients in a hotel. """
    name = 'clients'


class ClientDetailView(generics.RetrieveUpdateDestroyAPIView, BaseClientView):
    """Retrieve, update and delete Client. """
    name = 'client-details'


class BaseClientExpenseView(viewsets.GenericViewSet):
    queryset = models.ClientExpenses.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.ClientExpensesSerializer


class ClientExpensesListView(generics.ListCreateAPIView, BaseClientExpenseView):
    """List and create new client expenses record. """
    name = 'client-expenses'


class ClientExpensesDetailView(generics.RetrieveUpdateDestroyAPIView,
                               ):
    """List, update and delete a single client expense record. """

    queryset = models.ClientExpenses.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.ClientExpensesSerializer
    name = 'client-expense-details'
