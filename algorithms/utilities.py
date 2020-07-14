def build_grid(*args, **kwargs):
    grid = []

    for column in range(kwargs['width']):
        for row in range(kwargs['height']):
            grid.append({
                'column': column,
                'row': row,
                'is_start': kwargs['start_col'] == column and kwargs['start_row'] == row,
                'is_goal': kwargs['goal_col'] == column and kwargs['goal_row'] == row,
                'is_wall': False,
            })

    return grid
