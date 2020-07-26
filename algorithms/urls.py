from django.urls import path
from . import views


urlpatterns = [
    path('best-first', views.best_first_view, name='best-first-algorithm'),
]
