from django.db import models
from datetime import timedelta
from room.models import Room
from client.models import HotelClient


class Booking(models.Model):
    BOOKED = 'Booked'
    CHECK_IN = 'Check in'
    CHECKOUT = 'Checkout'

    CUSTOMER_BOOKING_STATUS = (
        (BOOKED, 'Booked'),
        (CHECK_IN, 'Check in'),
        (CHECKOUT, 'Checkout'),
    )

    PENDING = 'Pending'
    CONFIRMED = 'Confirmed'

    BOOKING_PROGRESS_STATUS = (
        (PENDING, 'Pending'), (CONFIRMED, 'Confirmed'))

    expected_check_in_date = models.DateField()
    expected_checkout_date = models.DateField()

    customer = models.ForeignKey(
        HotelClient, on_delete=models.CASCADE, related_name='bookings')
    customer_booking_status = models.TextField(
        max_length=50, choices=CUSTOMER_BOOKING_STATUS, default=BOOKED)

    booking_status = models.CharField(
        max_length=50, choices=BOOKING_PROGRESS_STATUS, default=PENDING)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    actual_check_in_date = models.DateField(null=True)
    actual_checkout_date = models.DateField(null=True)

    room = models.ForeignKey(
        Room, on_delete=models.DO_NOTHING, related_name='bookings')

    # room_category = models.ForeignKey(
    #     RoomCategory, on_delete=models.DO_NOTHING, related_name='bookings')

    paid_advance = models.FloatField(default=0.0)

    def __str__(self):
        return f"Booked by {self.customer_name} on {self.created_at}, for {self.booking_days} days."

    @property
    def booking_days(self):
        """Returns total number of booking days. """

        start_date = self.actual_check_in_date if self.actual_check_in_date else self.expected_check_in_date

        end_date = self.actual_checkout_date if self.actual_checkout_date else self.expected_checkout_date

        return int((end_date-start_date) / timedelta(days=1))

    @property
    def total_price(self):
        return self.booking_days * self.room.price

    @property
    def remaining_price(self):
        return self.total_price - self.paid_advance if self.paid_advance else 0

    class Meta:
        ordering = ['-expected_checkout_date']
