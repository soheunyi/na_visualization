import numpy as np
import json


pivotal_position = []
clock = 0
inner_nodes = 4
interpolation_method = "linear"


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


def linear_interpolation(points, path_points_num=150):
    if len(points) < 2:
        return points
    points = sort_2d_array(np.array(points))
    points_x = points[:, 0]
    points_y = points[:, 1]

    x_arr = np.linspace(points_x[0], points_x[-1], path_points_num)

    func_index = get_func_index(x_arr, points_x)

    return np.array([x_arr, (points_y[func_index + 1] - points_y[func_index]) /
                     (points_x[func_index + 1] - points_x[func_index]) *
                     (x_arr - points_x[func_index]) + points_y[func_index]]).T


def piecewise_sine_curve(x_arr, nodes, inner_nodes):
    nodes = np.sort(np.unique(nodes))
    func_index = get_func_index(x_arr, nodes)

    return np.sin(inner_nodes * np.pi * (x_arr - nodes[func_index]) /
                  (nodes[func_index + 1] - nodes[func_index]))


def wavy_interpolation(points, amp=100, inner_nodes=1, path_points_num=150, clock=None):
    if len(points) < 2:
        return np.array([])
    x_arr, linear_y = linear_interpolation(points, path_points_num).T
    points = np.array(points)
    points_x = points[:, 0]

    if clock == None:
        sine_y = amp * piecewise_sine_curve(x_arr, points_x, inner_nodes)
    else:
        sine_y = amp * np.sin(2 * np.pi * clock) * piecewise_sine_curve(x_arr,
                                                                        points_x, inner_nodes)

    return np.array([x_arr, sine_y + linear_y]).T


def lagrange_interpolation(points, path_points_num=150):
    if len(points) < 2:
        return np.array([])
    points = sort_2d_array(np.array(points))
    points_x = points[:, 0]
    points_y = points[:, 1]
    x_arr = np.linspace(points_x[0], points_x[-1], path_points_num)

    lagrange_poly = 0
    for i in range(points_x.size):
        partial_poly = np.poly(np.delete(points_x, i))
        lagrange_poly += partial_poly / \
            np.polyval(partial_poly, points_x[i]) * points_y[i]

    return np.array([x_arr, np.polyval(lagrange_poly, x_arr)]).T
