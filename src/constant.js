import brownianMotion from "./animations/absoluteAnimations/brownianMotion";
import linear from "./animations/absoluteAnimations/linear";
import circular from "./animations/relativeAnimations/circular";

export const SCAN_RATE = 60;

export const ABSOLUTE_ANIMATION_OPTIONS = [
  { value: () => () => ({ x: 0, y: 0 }), label: "None", variable: [] },
  {
    value: brownianMotion,
    label: "brownianMotion",
    variable: [{ name: "sigma", value: 5, type: "number" }],
  },
  {
    value: linear,
    label: "linear",
    variable: [
      { name: "x", value: 20, type: "number" },
      { name: "y", value: 10, type: "number" },
    ],
  },
];

export const RELATIVE_ANIMATION_OPTIONS = [
  { value: () => () => ({ x: 0, y: 0 }), label: "None", variable: [] },
  {
    value: circular,
    label: "circular",
    variable: [
      { name: "radius", value: 10, type: "number" },
      { name: "freq", value: 1, type: "number" },
      { name: "clockwise", value: true, type: "checkbox" },
    ],
  },
];
