export default function calculatePoints(formulaPieces) {
  const POINTS_NUM = 20;
  const points = [];
  formulaPieces.foreach((formulaPiece) =>
    points.push(formulaPiece.calculatePlotPoints(POINTS_NUM))
  );
}
