import React, { useRef, useEffect, useState } from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import _ from "lodash";

export default function PositionSetter(props) {
  const appendPoint = () => {
    const { position } = props;
    props.handleDoubleClick(position);
  };

  const [animationFrameCount, setAnimationFrameCount] = useState(0);

  const { animated, animation, lineWidth, style } = props;
  const { pointSize } = style;
  useEffect(() => {
    const interval = setInterval(() => {
      if (animated) {
        setAnimationFrameCount((prev) => prev + 1);
      }
    }, 1000 / 60);

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
        background: "skyblue",
      }}
      onDoubleClick={appendPoint}
    >
      {props.pivotalPoints.map((point) => {
        return (
          <FloatingPoint
            animated={animated}
            animation={animation}
            animationFrameCount={animationFrameCount}
            handleDrag={props.handleDrag}
            point={point}
            pointStyle={{ pointSize: 10, color: "yellow" }}
          />
        );
      })}
      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={props.plotPoints.path}
        points={props.plotPoints.pivotal}
        lineStyle={{ color: "black", width: lineWidth }}
        pointStyle={{ color: "red", pointSize: pointSize }}
        canvasStyle={{ width: 1600, height: 1000 }}
      />

      <p>{JSON.stringify(props)}</p>
    </div>
  );
}
