from .utilities import build_grid
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def best_first(request, *args, **kwargs):
    grid = build_grid(**kwargs)
    return Response(grid)

