export function pointsToArray(points) {
  return points.map((point) => [point.position.x, point.position.y]);
}
export function arrayToPoints(array) {
  return array.map((element) => ({ x: element[0], y: element[1] }));
}
