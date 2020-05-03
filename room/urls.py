from django.urls import path
from . import views

urlpatterns = [
    path('list-rooms/', views.ListRoomView.as_view()),
    path('create-room/', views.CreateRoomView.as_view()),
    path('list-rooms/<int:pk>', views.RoomDetailView.as_view()),
    path('list-categories/', views.CategoryListView.as_view()),
    path('room-categories/', views.CategoryAPIView.as_view()),
    path('room-categories/<int:pk>', views.CategoryDetailView.as_view()),
]
