from .best_first_utilities import get_neighbors, get_shortest_path


def best_first_search_algorithm(data):
    path_found = False

    current_node = data['start_node']
    current_node['is_visited'] = True
    closed_path = [{'node': current_node}]
    open_path = get_neighbors(current_node, data)
    open_path.sort(key=lambda node: node['heuristic'])
    for node in open_path:
        node['node']['is_visited'] = True

    while path_found is False:
        current_node = open_path[0] if open_path else None
        path_found = True if current_node and current_node['heuristic'] == 0 else path_found

        closed_path.append(current_node)
        open_path.pop(0)
        open_path += get_neighbors(current_node['node'], data)
        open_path.sort(key=lambda node: node['heuristic'])
        for node in open_path:
            node['node']['is_visited'] = True

    shortest_path = get_shortest_path(closed_path)
    return {'open_path': open_path, 'closed_path': closed_path, 'shortest_path': shortest_path}
