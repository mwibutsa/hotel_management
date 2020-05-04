from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from .models import Booking
from room import models as room_models
from .serializers import BookingSerializer, StaffBookingSerializer
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status


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

    # def update(self, request, *args, **kwargs):

    #     serializer = self.get_serializer(data=request.data)
    #     import pdb
    #     pdb.set_trace()
    #     return super().update(request, *args, **kwargs)


class CreateBookingAPIView(generics.CreateAPIView):
    """Allow customers to make a booking for a particular room. """

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = ()

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

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

            if not wanted_room or (wanted_room.booking_status != Booking.PENDING or checkout_date < check_in_date):
                instance = serializer.save()
                room.room_status = Booking.BOOKED

                room.save(update_fields=['room_status', 'updated_at'])

                subject = 'Booking confirmation request'
                recipient = serializer['customer_email'].value
                sender_email = settings.EMAIL_HOST_USER

                message = """
                Dear {name},
                
                Thank you for your consideration to our hotel, in order to consider
                your booking seriously we would like you to pay a non refundable amount equal to the half of 
                the total amount that should be paid.
                
                Kindly follow this link to complete the booking. 
                """

                # send_mail(subject, message.format(name=serializer['customer_name'].value), sender_email, [
                #     recipient], fail_silently=False)

                return Response(data=serializer.data, status=status.HTTP_201_CREATED)

            else:
                return Response(data={
                    'message': f"This room is not availabe for check in before {wanted_room.expected_checkout_date}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response(data={'message': 'There ware an internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
