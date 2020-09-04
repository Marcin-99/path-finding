from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def list_mazes(request):
    data = {"aa": "no"}
    return Response(data)


@api_view(['POST'])
def save_maze(request):
    print(request.body)
    #tu będę dodawał logikę tworzenia modelu Maze
    data = {"aa": "no"}
    return Response(data)
