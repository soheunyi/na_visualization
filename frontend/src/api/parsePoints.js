export function pointsToArray(points) {
  return points.map((point) => [point.position.x, point.position.y]);
}
export function arrayToPoints(array) {
  return array.map((element) => ({ x: element[0], y: element[1] }));
}

export function pathPointsParser(string) {
  const pathPoints = [];

  if (string === undefined || string === null || string === "") {
    return pathPoints;
  }
  const numberArray = string.split(",");

  for (let i = 0; i < numberArray.length / 2; i++) {
    pathPoints.push({
      x: Number(numberArray[2 * i]),
      y: Number(numberArray[2 * i + 1]),
    });
  }

  return pathPoints;
}
