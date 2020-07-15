from .utilities import get_neighbors


def best_first_search_algorithm(data):
    current_node = data['start_node']
    current_node['is_visited'] = True
    closed_path = [{'node': current_node}]
    open_path = get_neighbors(current_node, data)
    open_path.sort(key=lambda node: node['heuristic'])
    for node in open_path:
        node['node']['is_visited'] = True

    path_found = False
    while path_found is False:
        current_node = open_path[0] if open_path else None
        path_found = True if current_node and current_node['heuristic'] == 0 else path_found

        closed_path.append(current_node)
        open_path.pop(0)
        open_path += get_neighbors(current_node['node'], data)
        open_path.sort(key=lambda node: node['heuristic'])
        for node in open_path:
            node['node']['is_visited'] = True

    return open_path
