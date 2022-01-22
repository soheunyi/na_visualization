pivotal_position = parse_pivotal_position(pivotal_position)
path_position = wavy_interpolation(
    pivotal_position, path_points_num=150, inner_nodes=inner_nodes, clock=clock)
plot_pivotal = list(pivotal_position.flatten())
plot_path = list(path_position.flatten())
