import React, { useState, useEffect, useRef } from "react";

const PointCanvas = (props) => {
  const canvasRef = useRef(null);
  const { draw, points, lineStyle, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, points, lineStyle);
    return () => {};
  }, [points]);

  return <canvas ref={canvasRef} {...props} />;
};

export default PointCanvas;
