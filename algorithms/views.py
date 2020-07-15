from .utilities import build_grid
from .best_first_search_algorithm import best_first_search_algorithm
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def best_first(request, *args, **kwargs):
    data = build_grid(**kwargs)
    paths = best_first_search_algorithm(data)

    return Response(paths)

