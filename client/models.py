from django.db import models
from django.db.models.aggregates import Sum


class HotelClient(models.Model):
    """Hotel client record model """

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    identification_number = models.CharField(max_length=255,
                                             blank=True, null=True,
                                             unique=True)

    phone_number = models.CharField(max_length=15,
                                    blank=True, null=True, unique=True)

    is_checked_in = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        message = 'is' if self.is_checked_in else 'is not'
        return f"{self.first_name} {self.last_name} {message} checked in"


# CLIENTE EXPENSES MODEL MANAGER

class ExpensesManager(models.Manager):
    """Provide method to return client's unpaid expenses. """

    def get_unpaid_expenses(self):
        """Returns all inpaid expenses. """

        return super().get_queryset().filter(is_paid=False)

    def get_paid_expenses(self):
        """Returns all paid user expenses. """

        return super().get_queryset().filter(is_paid=True)

    def get_payment(self):
        """Return clients total price to pay. """

        return super().get_queryset().filter(
            is_paid=False).values('client').annotate(amount=Sum(
                'price',
                field="price * quantity"))


class ClientExpenses(models.Model):
    """A model to record client expenses during the checkin period. """

    client = models.ForeignKey(
        HotelClient, related_name='client_expenses', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_paid = models.BooleanField(default=False)

    objects = ExpensesManager()

    @property
    def get_payment(self):
        return self.objects.get_payment()

    def __repr__(self):
        return f" consumed {self.quantity} {self.name} for {self.price} each"

