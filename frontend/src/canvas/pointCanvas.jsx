import React, { useEffect, useRef } from "react";
import "./pointCanvas.css";

function drawCoordinates(ctx, x, y, pointStyle) {
  const { color = "#ff2626", pointSize = 10 } = pointStyle;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function PointCanvas(props) {
  const canvasRef = useRef(null);
  const {
    draw,
    pathPoints,
    points,
    pointStyle,
    lineStyle,
    canvasStyle,
  } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    points.map((point) => {
      drawCoordinates(context, point.x, point.y, pointStyle);
    });
    draw(context, pathPoints, lineStyle);
  }, [points, pathPoints]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasStyle.width}
      height={canvasStyle.height}
      {...props}
    />
  );
}

export default PointCanvas;
