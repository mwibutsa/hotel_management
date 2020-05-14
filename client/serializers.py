from rest_framework import serializers
from .models import ClientExpenses, HotelClient
from booking.serializers import BookingSerializer


class ClientExpensesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientExpenses
        fields = '__all__'

        read_only_fields = ('updated_at', 'created_at', 'id', 'client')


class HotelClientSerializer(serializers.ModelSerializer):

    client_expenses = ClientExpensesSerializer(read_only=True, many=True)
    bookings = BookingSerializer(read_only=True, many=True)

    class Meta:
        model = HotelClient
        fields = ('id', 'email', 'first_name',
                  'last_name', 'is_checked_in', 'updated_at',
                  'created_at', 'client_expenses', 'identification_number',
                  'phone_number', 'bookings')

        read_only_fields = ('updated_ata', 'created_at', 'id', 'is_checked_in')
