import { SCAN_RATE } from "../../constant";

const pseudoNormalGenerator = (n) => {
  var randomValue = 0;
  for (var i = 0; i < n; i++) {
    randomValue += Math.random();
  }
  return (randomValue - n / 2) / (n / 12) ** 2;
};

export default function linear(sigma) {
  return () => {
    return {
      x: (sigma * pseudoNormalGenerator(5)) / SCAN_RATE ** 0.5,
      y: (sigma * pseudoNormalGenerator(5)) / SCAN_RATE ** 0.5,
    };
  };
}
