from django.db import models
from django.utils.timezone import make_aware
import datetime


class Maze(models.Model):
    width = models.IntegerField()
    height = models.IntegerField()
    start_node = models.CharField(max_length=100)
    goal_node = models.CharField(max_length=100)
    walls = models.CharField(max_length=1_000_000)
    date_created = models.DateTimeField(default=make_aware(datetime.datetime.now()))
