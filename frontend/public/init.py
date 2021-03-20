import numpy as np

pivotal_position = []


def sort_2d_array(points):
    return points[np.lexsort(points.T[::-1])]


def get_x_level(x_arr, x_level_threshold):
    diff = np.array([x_arr] * x_level_threshold.size) - np.expand_dims(x_level_threshold, axis=1)
    is_bigger = np.where(diff > 0, 1, 0)
    return is_bigger.sum(axis=0)


def get_func_index(x_arr, x_level_threshold):
    x_level_threshold = np.unique(x_level_threshold)
    level_num = x_level_threshold.size
    if level_num < 2:
        raise ValueError("Cannot determine function with less than two x-levels")
    else:
        x_level = get_x_level(x_arr, x_level_threshold)
        return np.clip((x_level - 1), 0, level_num - 2)


def linear_interpolation(points, path_points_num=1000):
    if len(points) <= 1:
        return points
    points = sort_2d_array(np.array(points))
    points_x = points[:, 0]
    points_y = points[:, 1]

    x_arr = np.linspace(points_x[0], points_x[-1], path_points_num)

    func_index = get_func_index(x_arr, points_x)

    return np.array([x_arr, (points_y[func_index + 1] - points_y[func_index]) /
                     (points_x[func_index + 1] - points_x[func_index]) *
                     (x_arr - points_x[func_index]) + points_y[func_index]]).T
