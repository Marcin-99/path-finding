from django.urls import path
from . import views

urlpatterns = [
    path('best-first/'
         'width=<int:width>&'
         'height=<int:height>&'
         'start=<int:start_col>,<int:start_row>&'
         'finish=<int:finish_col>,<int:finish_row>',
         views.best_first, name="best-first-algorithm"),
]