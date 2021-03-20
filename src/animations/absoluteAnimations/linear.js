import { SCAN_RATE } from "../../constant";

export default function linear(speed) {
  return () => {
    return {
      x: speed.x / SCAN_RATE,
      y: speed.y / SCAN_RATE,
    };
  };
}
