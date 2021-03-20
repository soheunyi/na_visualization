export function positionParser(array) {
  const pathPoints = [];

  for (let i = 0; i < array.length / 2; i++) {
    pathPoints.push({
      x: array[2 * i],
      y: array[2 * i + 1],
    });
  }

  return pathPoints;
}
