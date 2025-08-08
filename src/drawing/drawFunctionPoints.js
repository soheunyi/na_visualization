const drawFunctionPoints = (ctx, points, style) => {
  const { color = 'black', width = 1 } = style;

  function sort_function(a, b) {
    if (a.x > b.x) return 1;
    if (a.x < b.x) return -1;
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
  }
  points.sort(sort_function);

  if (points.length > 1) {
    // Save current context state
    ctx.save();
    
    // Add shadow effects for line segments
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
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
    
    // Restore context state
    ctx.restore();
  }
};

export default drawFunctionPoints;
