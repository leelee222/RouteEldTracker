from django.db import models

class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_used = models.FloatField()  # in hours
    created_at = models.DateTimeField(auto_now_add=True)
    
    
class DriverLog(models.Model):
    driver = models.CharField(max_length=100)
    date = models.DateField()
    off_duty = models.FloatField()  # Hours
    sleeper_berth = models.FloatField()
    driving = models.FloatField()
    on_duty = models.FloatField()

    def __str__(self):
        return f"Trip from {self.pickup_location} to {self.dropoff_location}"