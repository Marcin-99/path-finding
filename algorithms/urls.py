from django.urls import path
from . import views


urlpatterns = [
    path('best-first/'
         'width=<int:width>&'
         'height=<int:height>&'
         'start=<int:start_col>,<int:start_row>&'
         'goal=<int:goal_col>,<int:goal_row>&'
         'walls=<str:walls>',
         views.best_first, name='best-first-algorithm'),
]
