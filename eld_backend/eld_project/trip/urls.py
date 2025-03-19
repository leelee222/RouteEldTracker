from django.urls import path
from .views import TripListCreate, GenerateDriverLogs

urlpatterns = [
    path('trips/', TripListCreate.as_view(), name='trip-list-create'),
    path("api/driver_logs/", GenerateDriverLogs.as_view(), name="driver_logs"),
]