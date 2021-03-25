from django.db import models
from django.contrib.auth.models import AbstractUser
from tasktracker import settings

# Create your models here.


class CustomUser(AbstractUser):
    # mobile_number = models.CharField(max_length=10, blank=True, default='')

    def __str__(self):
        return self.email
    

class Task(models.Model):
    author   =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    title    =  models.CharField(max_length=50)
    detail   =  models.CharField(max_length=100)
    reminder =  models.BooleanField(default=False)

    def __str__(self):
        return self.title

