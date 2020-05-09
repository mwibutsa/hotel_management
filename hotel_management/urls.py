from django.contrib import admin
from django.urls import path, include, re_path
from .views import FrontendView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/room/', include('room.urls')),
    path('api/booking/', include('booking.urls')),
    path('api/hotel-clients/', include('client.urls')),
    re_path(r'^(?P<path>.*)/$', FrontendView.as_view()),
    path('', FrontendView.as_view(), name='home-page')
]
