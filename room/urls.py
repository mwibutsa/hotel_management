from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.ListCreateRoomView.as_view()),
    path('rooms/<int:pk>', views.RoomDetailView.as_view()),
    path('room-category/', views.CategoryAPIView.as_view()),
    path('room-category/<int:pk>', views.CategoryDetailView.as_view()),
]
