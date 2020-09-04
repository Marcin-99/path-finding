from django.urls import path
from . import views


urlpatterns = [
    path('list', views.list_mazes, name='list-mazes'),
    path('save', views.save_maze, name='mazes-save'),
]