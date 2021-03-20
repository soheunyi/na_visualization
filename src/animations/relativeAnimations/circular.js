import { SCAN_RATE } from "../../constant";

export default function circular(radius, freq, clockwise) {
  return (animationFrameCount) => {
    const phase = clockwise
      ? (-2 * Math.PI * freq * animationFrameCount) / SCAN_RATE
      : (2 * Math.PI * freq * animationFrameCount) / SCAN_RATE;

    return {
      x: radius * Math.cos(phase) - radius,
      y: radius * Math.sin(phase),
    };
  };
}
