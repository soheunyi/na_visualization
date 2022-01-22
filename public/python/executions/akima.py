pivotal_position = parse_pivotal_position(pivotal_position)
path_position = akima_interpolation(pivotal_position, path_points_num=150)
plot_pivotal = list(pivotal_position.flatten())
plot_path = list(path_position.flatten())
