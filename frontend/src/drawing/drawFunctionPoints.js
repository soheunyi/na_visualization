const drawFunctionPoints = (ctx, points, style) => {
  //   console.log("inner", points);
  const { color = "black", width = 1 } = style;
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  function sort_function(a, b) {
    if (a.x > b.x) return 1;
    if (a.x < b.x) return -1;
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
  }
  points.sort(sort_function);
  console.log(points);

  if (points.length > 1) {
    ctx.beginPath();
    points.map((point, index) => {
      if (index >= points.length - 1) {
        return;
      }
      const nextPoint = points[index + 1];
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
};

export default drawFunctionPoints;
