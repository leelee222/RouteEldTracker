from rest_framework import generics
from .models import Trip, DriverLog
from .serializers import TripSerializer
from django.http import JsonResponse
from django.views import View
from datetime import datetime, timedelta


class TripListCreate(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class GenerateDriverLogs(View):
    def get(self, request):
        trip_days = 5
        
        log_entries = []
        start_date = datetime.today()

        for i in range(trip_days):
            log_entry = {
                "date": (start_date + timedelta(days=i)).strftime("%Y-%m-%d"),
                "off_duty": 6 + i % 3,
                "sleeper_berth": 2,
                "driving": min(11, 8 + i % 3),
                "on_duty": 24 - (6 + 2 + min(11, 8 + i % 3)),
            }
            log_entries.append(log_entry)

        return JsonResponse(log_entries, safe=False)
