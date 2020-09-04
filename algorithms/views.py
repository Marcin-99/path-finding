from .best_first_search_algorithm.best_first_utilities import build_grid
from .best_first_search_algorithm.best_first import best_first_search_algorithm
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json


@api_view(['POST'])
def best_first_view(request):
    data = json.loads(request.body.decode('utf-8'))
    grid_data = build_grid(
        walls=data['walls'],
        height=data['height'],
        width=data['width'],
        start_col=data['startColumn'],
        start_row=data['startRow'],
        goal_col=data['goalColumn'],
        goal_row=data['finishRow']
    )
    paths = best_first_search_algorithm(grid_data)
    return Response(paths)
