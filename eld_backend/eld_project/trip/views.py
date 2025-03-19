from rest_framework import generics
from .models import Trip, DriverLog
from .serializers import TripSerializer
from django.http import JsonResponse


class TripListCreate(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

from .models import DriverLog

def driver_logs(request):
    logs = DriverLog.objects.all().values()
    return JsonResponse(list(logs), safe=False)