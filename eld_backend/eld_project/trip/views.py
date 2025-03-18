from rest_framework import generics
from .models import Trip
from .serializers import TripSerializer

class TripListCreate(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer