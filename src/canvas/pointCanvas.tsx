import React, { useEffect, useRef } from 'react';
import './pointCanvas.css';
import { Position, PointStyle, LineStyle, CanvasStyle } from '../types';

function drawCoordinates(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  pointStyle: PointStyle
) {
  const { color = '#ff2626', pointSize = 10 } = pointStyle;
  
  // Save current context state
  ctx.save();
  
  // Draw shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
  
  // Reset shadow for stroke to avoid double shadow
  ctx.shadowColor = 'transparent';
  ctx.stroke();
  
  // Restore context state
  ctx.restore();
}

interface PointCanvasProps {
  draw: (
    ctx: CanvasRenderingContext2D,
    pathPoints: Position[],
    lineStyle: LineStyle
  ) => void;
  pathPoints: Position[];
  points: Position[];
  pointStyle: PointStyle;
  lineStyle: LineStyle;
  canvasStyle: CanvasStyle;
  [key: string]: any;
}

function PointCanvas(props: PointCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { draw, pathPoints, points, pointStyle, lineStyle, canvasStyle } =
    props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    draw(context, pathPoints, lineStyle);
    points.forEach(point => {
      drawCoordinates(context, point.x, point.y, pointStyle);
    });
  }, [draw, points, pathPoints, pointStyle, lineStyle]);

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
