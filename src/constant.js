import brownianMotion from "./animations/absoluteAnimations/brownianMotion";
import linear from "./animations/absoluteAnimations/linear";
import circular from "./animations/relativeAnimations/circular";

export const SCAN_RATE = 60;

export const ABSOLUTE_ANIMATION_OPTIONS = [
  { value: () => ({ x: 0, y: 0 }), label: "None" },
  { value: brownianMotion({ sigma: 5 }), label: "brownianMotion" },
  { value: linear({ x: 20, y: 10 }), label: "linear" },
];

export const RELATIVE_ANIMATION_OPTIONS = [
  { value: () => ({ x: 0, y: 0 }), label: "None" },
  {
    value: circular({ radius: 10, freq: 1, clockwise: true }),
    label: "circular",
  },
];
