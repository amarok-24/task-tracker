from django.shortcuts import render
from rest_framework import status, generics, mixins, permissions
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsAuthor

# Create your views here.

class TaskList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated,]               # This overrides project level permissions
    serializer_class = TaskSerializer

    def get_queryset(self):
        # queryset = Task.objects.all()
        queryset = Task.objects.filter(author = self.request.user)    # A user sees only his tasks list
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data )
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)           # set current logged in user as task's author
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthor,]               # This overrides project level permissions
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
