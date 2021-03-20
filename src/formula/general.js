// Deprecated

export default class generalPiece extends formulaPiece {
  constructor(func, range) {
    super(range);
    this.func = func;
  }
  evaluate(x) {
    return x >= this.range.lower && x <= this.range.upper ? func(x) : 0;
  }
}
