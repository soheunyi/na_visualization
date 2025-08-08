import { Position } from '../types';

export interface InterpolationRequest {
  method: string;
  points: Position[];
  pathPointsNum?: number;
}

export interface InterpolationResponse {
  success: boolean;
  data?: Position[];
  error?: string;
}

class InterpolationWorker {
  private pyodideReady = false;
  private pyodideCode = `
import numpy as np
from scipy.interpolate import (CubicSpline, Akima1DInterpolator,
                               PchipInterpolator, InterpolatedUnivariateSpline)
import re
import json

def sort_2d_array(points):
    return points[np.lexsort(points.T[::-1])]

def parse_points(points_list):
    return np.array(points_list, dtype=np.float64)

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
    points = sort_2d_array(points)
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
        sine_y = amp * np.sin(2 * np.pi * clock) * piecewise_sine_curve(x_arr, points_x, inner_nodes)
    return np.array([x_arr, sine_y + linear_y]).T

def lagrange_interpolation(points, path_points_num=150):
    if len(points) < 2:
        return np.array([])
    points = sort_2d_array(points)
    points_x = points[:, 0]
    points_y = points[:, 1]
    x_arr = np.linspace(points_x[0], points_x[-1], path_points_num)
    lagrange_poly = 0
    for i in range(points_x.size):
        partial_poly = np.poly(np.delete(points_x, i))
        lagrange_poly += partial_poly / np.polyval(partial_poly, points_x[i]) * points_y[i]
    return np.array([x_arr, np.polyval(lagrange_poly, x_arr)]).T

def cubic_spline_interpolation(points, path_points_num=150):
    if len(points) < 2:
        return np.array([])
    points = sort_2d_array(np.array(points))
    points_x = points[:, 0]
    points_y = points[:, 1]
    x_arr = np.linspace(points_x[0], points_x[-1], path_points_num)
    ppoly = CubicSpline(points_x, points_y)
    return np.array([x_arr, ppoly(x_arr)]).T

def interpolate(method, points, path_points_num=150):
    try:
        points_array = parse_points(points)
        if method == 'linear':
            result = linear_interpolation(points_array, path_points_num)
        elif method == 'wavy':
            result = wavy_interpolation(points_array, path_points_num=path_points_num)
        elif method == 'lagrange':
            result = lagrange_interpolation(points_array, path_points_num)
        elif method == 'cubic_spline':
            result = cubic_spline_interpolation(points_array, path_points_num)
        else:
            result = linear_interpolation(points_array, path_points_num)
        
        return result.tolist()
    except Exception as e:
        raise Exception(f"Interpolation error: {str(e)}")
`;

  async initialize() {
    if (this.pyodideReady) return;

    // This would be implemented differently in a real worker
    // For now, we'll simulate the worker functionality
    console.log('Initializing interpolation worker...');
    this.pyodideReady = true;
  }

  async interpolate(
    request: InterpolationRequest
  ): Promise<InterpolationResponse> {
    try {
      await this.initialize();

      // In a real implementation, this would use Pyodide
      // For now, we'll provide a simple linear interpolation fallback
      if (request.points.length < 2) {
        return { success: true, data: request.points };
      }

      const sortedPoints = [...request.points].sort((a, b) => a.x - b.x);
      const pathPointsNum = request.pathPointsNum || 150;
      const xMin = sortedPoints[0].x;
      const xMax = sortedPoints[sortedPoints.length - 1].x;

      const result: Position[] = [];

      for (let i = 0; i < pathPointsNum; i++) {
        const x = xMin + ((xMax - xMin) * i) / (pathPointsNum - 1);

        // Simple linear interpolation
        let y = 0;
        for (let j = 0; j < sortedPoints.length - 1; j++) {
          if (x >= sortedPoints[j].x && x <= sortedPoints[j + 1].x) {
            const ratio =
              (x - sortedPoints[j].x) /
              (sortedPoints[j + 1].x - sortedPoints[j].x);
            y =
              sortedPoints[j].y +
              ratio * (sortedPoints[j + 1].y - sortedPoints[j].y);
            break;
          }
        }

        result.push({ x, y });
      }

      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const interpolationWorker = new InterpolationWorker();
