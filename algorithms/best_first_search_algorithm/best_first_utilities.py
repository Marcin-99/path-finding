def build_grid(*args, **kwargs):
    grid = []
    walls = read_walls_coordinates(kwargs['walls'])
    start_node = None
    goal_node = None

    for row in range(kwargs['height']):
        grid.append([])
        for column in range(kwargs['width']):
            node = {
                'column': column,
                'row': row,
                'is_start': kwargs['start_col'] == column and kwargs['start_row'] == row,
                'is_goal': kwargs['goal_col'] == column and kwargs['goal_row'] == row,
                'is_wall': [column, row] in walls,
                'is_visited': False,
            }
            grid[row].append(node)
            start_node = node if node['is_start'] is True else start_node
            goal_node = node if node['is_goal'] is True else goal_node

    return {'grid': grid, 'start_node': start_node, 'goal_node': goal_node}


def get_neighbors(node, data):
    indexes = [
        {'x': -1, 'y': 0} if node['row'] > 0 else None,
        {'x': 1, 'y': 0} if node['row'] < len(data['grid']) - 1 else None,
        {'x': 0, 'y': -1} if node['column'] > 0 else None,
        {'x': 0, 'y': 1} if node['column'] < len(data['grid'][0]) - 1 else None
    ]

    neighbors = [{
            'node': data['grid'][node['row'] + index['x']][node['column'] + index['y']],
            'heuristic': get_heuristic_value(data['grid'][node['row'] + index['x']][node['column'] + index['y']], data)
        } for index in indexes if index
    ]

    return [neighbor for neighbor in neighbors
            if neighbor['node']['is_wall'] is False and neighbor['node']['is_visited'] is False]


def get_heuristic_value(node, data):
    return abs(data['goal_node']['column'] - node['column']) + abs(data['goal_node']['row'] - node['row'])


def read_walls_coordinates(walls):
    walls_list = [coordinates.split(',') for coordinates in walls.split('&')]
    return [[int(x[0]), int(x[1])] for x in walls_list]

'''
def eliminate_redundant_paths(path):
    path.reverse()
    for i in range(1, len(path)):
        if path[i - 1]['heuristic'] == path[i]['heuristic']:
        print(path[i])
'''









