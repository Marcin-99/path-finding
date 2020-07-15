from django.urls import path
from . import views

# example url: /algorithms/best-first/width=8&height=8&start=0,4&goal=7,5&walls=1,5&1,7&2,5&2,7&3,5&3,7&4,4&4,5&4,7&5,4&5,7&6,5&6,6&6,7


urlpatterns = [
    path('best-first/'
         'width=<int:width>&'
         'height=<int:height>&'
         'start=<int:start_col>,<int:start_row>&'
         'goal=<int:goal_col>,<int:goal_row>&'
         'walls=<str:walls>',
         views.best_first, name="best-first-algorithm"),
]
