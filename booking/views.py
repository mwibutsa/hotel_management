import stripe
from django.conf import settings
from rest_framework import generics
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import (IsAuthenticated,
                                        BasePermission)

from .models import Booking
from room import models as room_models
from .serializers import BookingSerializer, StaffBookingSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status
from client.models import HotelClient


class IsStaff(BasePermission):
    """Allow access to only either staff members or Admins. """

    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_admin


class BaseAPIView(generics.GenericAPIView):
    """Base api view to make same attributes shareable. """
    queryset = Booking.objects.all()
    permission_classes = (IsAuthenticated, IsStaff)
    serializer_class = StaffBookingSerializer


class ListBookingAPIView(generics.ListAPIView, BaseAPIView):
    """API to handle listing available bookings. """


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView, BaseAPIView):
    """API to handle listing available bookings. """


class CreateBookingAPIView(generics.CreateAPIView):
    """Allow customers to make a booking for a particular room. """

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = ()

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            validated_data = serializer.validated_data

            first_name, last_name = validated_data['customer_name'].split(' ')

            # Check to save client if they don't exist in the database

            client = None
            try:
                client = HotelClient.objects.get(
                    email=validated_data['customer_email'])
            except ObjectDoesNotExist:
                pass

            if not client:
                client = HotelClient.objects.create(
                    email=validated_data['customer_email'],
                    first_name=first_name, last_name=last_name)

                client.save()

            room = serializer.validated_data['room']

            wanted_room = Booking.objects.filter(
                room=room.id)

            wanted_room = wanted_room[len(
                wanted_room) - 1] if len(wanted_room) > 0 else None

            checkout_date = None
            check_in_date = serializer.validated_data['expected_check_in_date']

            if wanted_room is not None:
                checkout_date = wanted_room.expected_checkout_date
            else:
                checkout_date = datetime.now()

            if not wanted_room or (wanted_room.booking_status
                                   != Booking.PENDING
                                   or checkout_date < check_in_date):

                validated_data.pop('customer_email')
                validated_data.pop('customer_name')

                validated_data['customer_id'] = client.id
                serializer.save()

                room.room_status = Booking.BOOKED

                room.save(update_fields=['room_status', 'updated_at'])

                return Response(data=serializer.data,
                                status=status.HTTP_201_CREATED)

            else:
                return Response(
                    data={
                        'message': f" the room is not availabe until \
                        {wanted_room.expected_checkout_date}"
                    }, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={
                'message': 'There was an internal server error'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CheckInAPIView(generics.RetrieveUpdateDestroyAPIView, BaseAPIView):
    """View and Update customer booking. """

    queryset = Booking.objects.all()

    def perform_update(self, serializer):
        instance = serializer.save()
        room = room_models.Room.objects.get(
            room_number=serializer['room'].value)
        room.room_status = room.IN_USE
        room.save(update_fields=['room_status'])

        return instance


class AdvancePaymentView(generics.CreateAPIView):
    """API view to make initial payment to confirm client booking. """

    stripe.api_key = settings.STRIPE_SECRET_KEY

    def create(self, request, *args, **kwargs):

        advance_value = 10000
        try:
            payment = stripe.Charge.create(
                amount=advance_value,
                currency='USD',
                description='Booking confirmation payment',
                source=request.data['source']
            )
            client = HotelClient.objects.filter(
                email=payment['billing_details']['name'])[0]
            booking = Booking.objects.filter(
                customer=client,
                booking_status='Pending').order_by('-created_at')[0]

            booking.paid_advance = booking.paid_advance + (advance_value/100)
            booking.booking_status = 'Confirmed'
            booking.save()

            return Response(data={
                'message': f'You advance payment of ${advance_value/100} has \
                    is successful, You booking is confirmed.'
            })
        except Exception as error:
            return Response(data={
                'message': f'your advance payment has failed. please make sure\
                     the card number is spelt collectly Error: {error}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
