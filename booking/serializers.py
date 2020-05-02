from rest_framework import serializers
from .models import Booking
from room import models


class BaseSerializer(serializers.Serializer):
    """Base serializer for booking model. """
    total_price = serializers.ReadOnlyField()
    remaining_price = serializers.ReadOnlyField()
    booking_days = serializers.ReadOnlyField()


class BookingSerializer(BaseSerializer, serializers.ModelSerializer):
    """Serializer Booking model to and from JSON. """

    room = serializers.SlugRelatedField(
        queryset=models.Room.objects.all(), slug_field='room_number')

    class Meta:
        model = Booking
        fields = '__all__'
        extra_kwargs = {
            'created_at': {
                'read_only': True,
            },
            'updated_at': {
                'read_only': True
            },
            'actual_check_in_date': {
                'read_only': True
            },
            'actual_checkout_date': {
                'read_only': True
            },
            'customer_booking_status': {
                'read_only': True
            },
            'booking_status': {
                'read_only': True
            },
            'total_price': {
                'read_only': True
            },
            'remaining_price': {
                'read_only': True
            },
            'booking_days': {
                'read_only': True
            },
            'paid_advance': {
                'read_only': True
            }

        }


class StaffBookingSerializer(BaseSerializer, serializers.ModelSerializer):
    """ A serializer for admin and staff to convert Booking model to and form JSON. """

    room = serializers.SlugRelatedField(
        queryset=models.Room.objects.all(), slug_field='id')

    actual_checkout_date = serializers.DateField(required=False)

    class Meta:
        model = Booking
        fields = '__all__'

        extra_kwargs = {
            'created_at': {
                'read_only': True,
            },
            'updated_at': {
                'read_only': True
            },
            'expected_check_in_date': {
                'read_only': True
            },
            'expected_checkout_date': {
                'read_only': True
            },

        }

    def update(self, instance, validated_data):

        paid_advance = validated_data.get('paid_advance', 0)

        validated_data['paid_advance'] = float(
            instance.paid_advance) + paid_advance
        for key in validated_data:
            setattr(instance, key, validated_data.get(
                key, getattr(instance, key, '')))

        instance.save()
        return instance
