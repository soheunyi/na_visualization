export default class FormulaPiece {
  constructor(range) {
    const { lower, upper } = range;
    this.lower = lower;
    this.upper = upper;
    this.width = upper - lower;
    this.calculatePlotPoints = this.calculatePlotPoints.bind(this);
  }

  evaluate(x) {
    return 0;
  }

  calculatePlotPoints(pointsNum) {
    const plotPoints = [];
    var i = 0;
    while (i <= pointsNum) {
      const x = (i / pointsNum) * this.width + this.lower;
      plotPoints.push({ x: x, y: this.evaluate(x) });
      i++;
    }
    return plotPoints;
  }
}
