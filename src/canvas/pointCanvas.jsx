import React, { useState, useEffect, useRef } from "react";

function drawCoordinates(ctx, x, y) {
  const pointSize = 10;
  ctx.beginPath();
  ctx.fillStyle = "#ff2626"; // Red color
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
}

const PointCanvas = (props) => {
  const canvasRef = useRef(null);
  const { draw, points, lineStyle, style, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    draw(context, points, lineStyle);
    points.forEach((point) => {
      drawCoordinates(context, point.x, point.y);
    });
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width={style.width}
      height={style.height}
      {...props}
    />
  );
};

export default PointCanvas;
