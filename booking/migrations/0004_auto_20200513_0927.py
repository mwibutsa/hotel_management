# Generated by Django 2.2.12 on 2020-05-13 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0003_auto_20200408_1426'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='customer_email',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='customer_name',
        ),
        migrations.AlterField(
            model_name='booking',
            name='customer_booking_status',
            field=models.TextField(choices=[('Booked', 'Booked'), ('Check in', 'Check in'), ('Checkout', 'Checkout')], default='Booked', max_length=50),
        ),
    ]
