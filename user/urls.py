from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginAPIView.as_view()),
    path('list/', views.UserListView.as_view()),
    path('<int:pk>', views.UserDetailView.as_view()),
    path('profiles/', views.ProfilesListView.as_view()),
    path('profile/<int:pk>', views.UpdateUserAPIView.as_view()),
]
