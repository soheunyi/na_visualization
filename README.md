# Numerical Analysis Visualization
## Interpolation Methods

Currently, there are three interpolation methods supported, which are linear, wavy, lagrange.

Adding new certain interpolation method should follow steps below:

1. Implement a function that represents the interpolation method, which receives pivotal_position(`np.array` of 2d position) and returns positions on interpolation curve.
2. Name the interpolation method, and add {value:name, label:name} in `INTERPOLATION_OPTIONS` of [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js)

More interpolation methods will be added soon.

## Pyodide

Thanks to [Pyodide](https://github.com/iodide-project/pyodide), this project uses Python on the web.

## Animations

Just for FUN!!

### Absolute Animations

Animations that its displacement does not depend on time(I think this terminology is terrible)

Possible absolute animations can be Brownian motion, linear movement, etc.

New animations can be easily implemented through adding animation functions in [absoluteAnimations](https://github.com/lsdluis1/na_visualization/tree/master/src/animations/absoluteAnimations) and adding corresponding contents in [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js)

### Relative animations

Animations that depend on "animated time" of a FloatingPoint

Possible relative animations can be a simple circular motion, simple harmonic movement, etc.

New animations can be easily implemented through adding animation functions in [relativeAnimations](https://github.com/lsdluis1/na_visualization/tree/master/src/animations/relativeAnimations) and adding corresponding contents in [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js)
