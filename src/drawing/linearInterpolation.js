const linearInterpolation = (ctx, points, style) => {
  //   console.log("inner", points);
  const { color = "black", width = 1 } = style;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  points.sort((a, b) => (a.x > b.x ? 1 : -1));

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

export default linearInterpolation;
