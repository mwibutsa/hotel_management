from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.LoginAPIView.as_view()),
    path('api/user/', views.UserListView.as_view()),
    path('api/user/<int:pk>', views.UserDetailView.as_view()),
    path('api/profiles/', views.ProfilesListView.as_view()),
    path('api/profile/<int:pk>', views.UpdateUserAPIView.as_view()),
]
