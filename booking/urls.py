from django.urls import path
from . import views

urlpatterns = [
    path('create-booking/', views.CreateBookingAPIView.as_view()),
    path('list-bookings/', views.ListBookingAPIView.as_view()),
    path('list-bookings/<int:pk>', views.BookingDetailView.as_view()),
    path('<int:pk>/customer-check-in/', views.CheckInAPIView.as_view()),
    path('<int:pk>/customer-checkout/', views.CheckInAPIView.as_view()),
]
