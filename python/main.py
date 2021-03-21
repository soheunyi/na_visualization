import numpy as np
import json


if type(pivotal_position) == str:
    pivotal_position = np.array(json.loads(pivotal_position), dtype=np.float64)

if interpolation_method == 'wavy':
    path_position = wavy_interpolation(
        pivotal_position, path_points_num=150, inner_nodes=inner_nodes, clock=clock)
elif interpolation_method == 'linear':
    path_position = linear_interpolation(pivotal_position, path_points_num=150)

plot_position = json.dumps({'path': list(path_position.flatten()),
                            'pivotal': list(pivotal_position.flatten())})
