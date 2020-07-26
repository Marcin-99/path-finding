from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def mazes_list(request, *args, **kwargs):
    data = {"aa": "no"}
    return Response(data)
