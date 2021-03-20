import numpy as np
import json


if type(pivotal_position) == str:
    pivotal_position = np.array(json.loads(pivotal_position))
path_position = linear_interpolation(pivotal_position, path_points_num=150)
plot_position = {'path': list(path_position.flatten()),
                 'pivotal': list(pivotal_position.flatten())}
