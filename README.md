# Numerical Analysis Visualization
The result of this project is uploaded on [my Github Pages](https://lsdluis1.github.io/na_visualization/).
Special thanks to [woogenius](https://github.com/woogenius) for his aid when I got stuck, especially with introducing Pyodide to me.

## Interpolation Methods
Currently, there are three interpolation methods supported, which are linear, wavy, lagrange.
Adding new certain interpolation method should follow the steps below:
1. Implement a function that represents the interpolation method in [init.py](https://github.com/lsdluis1/na_visualization/blob/master/public/python/init.py), which receives `pivotal_position`(`np.array` of 2d position) and returns `path_position`(`np.array` of 2d position) that describes interpolation curve. Note that name of the function must be formatted `{name}_interpolation`
2. Add `{value:name, label:name}` in `INTERPOLATION_OPTIONS` of [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js).

More interpolation methods will be added soon.
## Pyodide
Thanks to remarkable [Pyodide](https://github.com/iodide-project/pyodide), this project uses Python on the web.
## Dynamic Features
### Create Draggable Points
One can double click to add `FloatingPoint`s on the canvas, which are draggable. Enjoy the sight of a dynamic curve as points change their position!
### Toggleable Animation
Animations on `FloatingPoint`s can be toggled by a switch on the left-top side of the resulting page. More information below.
### Configurable Animations
One can choose what animation she will put on `FloatingPoint`s. In addition, parameters for animating functions are also configurable. More information below.
### Selectable Interpolation Methods
One can select an interpolation method to connect points with. This option can be found on right-top side of the page.
## Animations 
Just for FUN!!
### Absolute Animations
- Animations that its displacement does not depend on time(This terminology is terrible).
- Possible absolute animations can be Brownian motion, linear movement, etc.
- New animations can be easily implemented through adding animation functions in [absoluteAnimations](https://github.com/lsdluis1/na_visualization/tree/master/src/animations/absoluteAnimations) and adding corresponding contents in `ABSOLUTE_ANIMATION_OPTIONS` of [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js).
### Relative Animations
- Animations that depend on "animated time" of a `FloatingPoint`.
- Possible relative animations can be a simple circular motion, simple harmonic movement, etc.
- New animations can be easily implemented through adding animation functions in [relativeAnimations](https://github.com/lsdluis1/na_visualization/tree/master/src/animations/relativeAnimations) and adding corresponding contents in `RELATIVE_ANIMATION_OPTIONS` of [constant.js](https://github.com/lsdluis1/na_visualization/blob/master/src/constant.js).

## References
- [scipy.interpolate](https://docs.scipy.org/doc/scipy/reference/interpolate.html)
- [Pyodide](https://github.com/iodide-project/pyodide)
