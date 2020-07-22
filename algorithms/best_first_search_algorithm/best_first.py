from .best_first_utilities import get_neighbors


def best_first_search_algorithm(data):
    current_node = data['start_node']
    current_node['is_visited'] = True
    closed_path = [{'node': current_node}]
    open_path = get_neighbors(current_node, data)
    open_path.sort(key=lambda node: node['heuristic'])
    for node in open_path:
        node['node']['is_visited'] = True

    while current_node['heuristic'] != 0:
        current_node = open_path[0] if open_path else None
        closed_path.append(current_node)
        open_path.pop(0)
        open_path += get_neighbors(current_node['node'], data)
        open_path.sort(key=lambda node: node['heuristic'])
        for node in open_path:
            node['node']['is_visited'] = True

    open_path.reverse()
    return {'open_path': open_path, 'closed_path': closed_path}
