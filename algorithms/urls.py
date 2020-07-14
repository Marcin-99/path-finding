from django.urls import path
from . import views

# example url: /algorithms/best-first/width=3&height=3&start=0,1&goal=2,1&walls='a'


urlpatterns = [
    path('best-first/'
         'width=<int:width>&'
         'height=<int:height>&'
         'start=<int:start_col>,<int:start_row>&'
         'goal=<int:goal_col>,<int:goal_row>&'
         'walls=<str:walls>',
         views.best_first, name="best-first-algorithm"),
]
