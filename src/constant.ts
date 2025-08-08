import brownianMotion from './animations/absoluteAnimations/brownianMotion';
import linear from './animations/absoluteAnimations/linear';
import circular from './animations/relativeAnimations/circular';
import { AnimationOption, InterpolationOption } from './types';

export const SCAN_RATE = 60;

export const ABSOLUTE_ANIMATION_OPTIONS: AnimationOption[] = [
  { value: () => () => ({ x: 0, y: 0 }), label: "None", variable: [] },
  {
    value: brownianMotion,
    label: "Brownian Motion",
    variable: [{ name: "sigma", value: 5, type: "number" }],
  },
  {
    value: linear,
    label: "Linear",
    variable: [
      { name: "x", value: 20, type: "number" },
      { name: "y", value: 10, type: "number" },
    ],
  },
];

export const RELATIVE_ANIMATION_OPTIONS: AnimationOption[] = [
  { value: () => () => ({ x: 0, y: 0 }), label: "None", variable: [] },
  {
    value: circular,
    label: "Circular",
    variable: [
      { name: "radius", value: 10, type: "number" },
      { name: "freq", value: 1, type: "number" },
      { name: "clockwise", value: true, type: "checkbox" },
    ],
  },
];

export const INTERPOLATION_OPTIONS: InterpolationOption[] = [
  { value: "wavy", label: "Wavy" },
  { value: "linear", label: "Linear" },
  { value: "lagrange", label: "Lagrange" },
  { value: "quad_spline", label: "Quadratic Spline" },
  { value: "cubic_spline", label: "Cubic Spline" },
  { value: "fourth_spline", label: "4th Spline" },
  { value: "fifth_spline", label: "5th Spline" },
  { value: "akima", label: "Akima" },
  { value: "pchip", label: "PCHIP" },
];
