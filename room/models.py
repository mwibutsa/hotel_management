from django.db import models


class RoomCategory(models.Model):
    category_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.category_name


class Room(models.Model):

    IN_USE = 'IN_USE'
    AVAILABLE = 'AVAILABLE'
    OUT_OF_SERVICE = 'OUT_OF_SERVICE'
    BOOKED = 'BOOKED'

    ROOM_STATUS = (
        (AVAILABLE, 'Available'),
        (BOOKED, 'Booked'),
        (IN_USE, 'In use'),
        (OUT_OF_SERVICE, 'Out of service'),
    )

    room_category = models.ForeignKey(
        'RoomCategory', related_name='rooms',
        on_delete=models.CASCADE)

    room_number = models.IntegerField(unique=True)
    price = models.FloatField()
    room_status = models.CharField(
        choices=ROOM_STATUS, default=AVAILABLE, max_length=50)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room no: {self.room_number} is ${self.price} per day"
