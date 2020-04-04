from django.db import models
from datetime import datetime
from room.models import Room


class Booking(models.Model):
    BOOKED = 'Booked'
    CHECK_IN = 'Check-in'
    CHECKOUT = 'Checkout'

    CUSTOMER_BOOKING_STATUS = ((CHECK_IN, 'Check in'),
                               (CHECKOUT, 'Checkout'),
                               (BOOKED, 'BOOKED'))

    PENDING = 'Pending'
    CONFIRMED = 'Confirmed'

    BOOKING_PROGRESS_STATUS = (
        (PENDING, 'Pending'), (CONFIRMED, 'Confirmed'))

    customer_email = models.EmailField()
    customer_name = models.CharField(max_length=255)

    expected_check_in_date = models.DateTimeField()
    expected_checkout_date = models.DateTimeField()

    customer_booking_status = models.TextField(
        max_length=50, choices=CUSTOMER_BOOKING_STATUS, default=BOOKED)

    booking_status = models.CharField(
        max_length=50, choices=BOOKING_PROGRESS_STATUS, default=PENDING)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    actual_check_in_date = models.DateTimeField(null=True)
    actual_checkout_date = models.DateTimeField(null=True)

    room = models.ForeignKey(
        Room, on_delete=models.DO_NOTHING, related_name='bookings')

    paid_advance = models.FloatField(null=True)

    def __str__(self):
        return f"Booked by ${self.customer} on ${self.created_at}, for ${self.get_booking_days()} days."

    def get_booking_days(self):
        """Returns total number of booking days. """
        start_date = datetime.strptime(self.expected_check_in_date, "%Y-%m-%d")
        end_date = datetime.strptime(self.expected_checkout_date, "%Y-%m-%d")
        return (start_date-end_date).days

    def get_total_price(self):
        return self.room.price * self.get_booking_days()

    def get_remaining_price(self):
        return self.get_total_price() - self.paid_advance
