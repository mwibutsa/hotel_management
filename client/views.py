from rest_framework import viewsets, generics
from . import models
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from . import serializers
from rest_framework import status
from rest_framework.response import Response


class BaseClientView:
    queryset = models.HotelClient.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.HotelClientSerializer


class ClientListView(generics.ListAPIView, BaseClientView,
                     viewsets.GenericViewSet):
    """List all clients in a hotel. """
    name = 'clients'


class ClientDetailView(BaseClientView, generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update and delete Client. """
    name = 'client-details'


class BaseClientExpenseView(viewsets.GenericViewSet):
    queryset = models.ClientExpenses.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.ClientExpensesSerializer


class ClientExpensesListView(generics.ListCreateAPIView, BaseClientExpenseView):
    """List and create new client expenses record. """
    name = 'client-expenses'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        validated_data['client_id'] = kwargs.get('parent_lookup_client')
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class ClientExpensesDetailView(generics.RetrieveUpdateDestroyAPIView,
                               ):
    """List, update and delete a single client expense record. """

    queryset = models.ClientExpenses.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.ClientExpensesSerializer
    name = 'client-expense-details'
