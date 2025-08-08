import React, { useEffect, useState } from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import { SCAN_RATE } from "./constant";

export default function PositionSetter(props) {
  const appendPoint = () => {
    const { position } = props;
    props.handleDoubleClick(position);
  };

  const [animationFrameCount, setAnimationFrameCount] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });

  const { animated, absoluteAnimation, relativeAnimation, lineWidth, style } =
    props;
  const { pointSize } = style;

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animated) {
        setAnimationFrameCount((prev) => prev + 1);
      }
    }, 1000 / SCAN_RATE);

    return () => {
      clearInterval(interval);
    };
  }, [animated]);

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
      onDoubleClick={appendPoint}
    >
      {props.pivotalPoints.map((point) => {
        return (
          <FloatingPoint
            animated={animated}
            absoluteAnimation={absoluteAnimation}
            relativeAnimation={relativeAnimation}
            animationFrameCount={animationFrameCount}
            handleDrag={props.handleDrag}
            point={point}
            pointStyle={{ pointSize: 10, color: "#f472b6" }}
          />
        );
      })}
      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={props.plotPoints.path}
        points={props.plotPoints.pivotal}
        lineStyle={{ color: "#000000", width: lineWidth }}
        pointStyle={{ color: "#06b6d4", pointSize: pointSize }}
        canvasStyle={{ width: dimensions.width, height: dimensions.height }}
      />
    </div>
  );
}
