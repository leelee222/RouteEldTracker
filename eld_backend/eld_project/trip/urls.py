from django.urls import path
from .views import TripListCreate

urlpatterns = [
    path('trips/', TripListCreate.as_view(), name='trip-list-create'),
]