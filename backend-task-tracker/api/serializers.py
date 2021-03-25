from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser, Task



class CustomRegisterSerializer(RegisterSerializer):
    # mobile_number = serializers.CharField(max_length=10, min_length=10, allow_blank=True)
    # Define transaction.atomic to rollback the save operation in case of error
    # @transaction.atomic
    # def save(self, request):
    #     user = super().save(request)
    #     user.mobile_number = self.data.get('mobile_number')
    #     user.save()
    #     return user
    pass

class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'email',
            # 'mobile_number',
        )
        read_only_fields = ('pk', 'email',)


class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model  = Task
        fields = ['pk', 'title', 'detail', 'reminder']
