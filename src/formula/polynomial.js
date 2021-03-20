// [0, 1, 2, 3] = 3x^3+2x^2+1x^1+0
import FormulaPiece from "./formulaPiece";

export class Polynomial {
  constructor(coefficients) {
    this.coefficients = coefficients;
  }

  evaluate(x) {
    var i = this.coefficients.length - 1;
    var evaluation = 0;
    while (i >= 0) {
      evaluation += this.coefficients[i];
      if (i === 0) {
        return evaluation;
      }
      evaluation *= x;
      i--;
    }
    return;
  }
}

export class PolynomialPiece extends FormulaPiece {
  constructor(coefficients, range) {
    super(range);
    this.polynomial = new Polynomial(coefficients);
  }

  evaluate(x) {
    return x >= this.lower && x <= this.upper ? this.polynomial.evaluate(x) : 0;
  }
}
