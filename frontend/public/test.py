import numpy as np
import json


if type(pivotal_position) == str:
    pivotal_position = np.array(json.loads(pivotal_position))
path_points = linear_interpolation(pivotal_position, path_points_num=100)
