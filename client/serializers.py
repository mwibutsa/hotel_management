from rest_framework import serializers
from .models import ClientExpenses, HotelClient


class ClientExpensesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientExpenses
        fields = '__all__'

        read_only_fields = ('updated_ata', 'created_at', 'id')


class HotelClientSerializer(serializers.ModelSerializer):

    client_expenses = ClientExpensesSerializer(read_only=True, many=True)

    class Meta:
        model = HotelClient
        fields = ('id', 'email', 'first_name',
                  'last_name', 'is_checked_in', 'updated_at',
                  'created_at', 'client_expenses')
        read_only_fields = ('updated_ata', 'created_at', 'id', 'is_checked_in')
