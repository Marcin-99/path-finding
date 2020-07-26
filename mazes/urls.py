from django.urls import path
from . import views


urlpatterns = [
    path('list', views.mazes_list, name='mazes-list'),
]