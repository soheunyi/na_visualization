import React from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";

export function PositionLabel(props) {
  const {
    detectedEnvironment: {
      isMouseDetected = false,
      isTouchDetected = false,
    } = {},
    elementDimensions: { width = 0, height = 0 } = {},
    isActive = false,
    isPositionOutside = false,
    position: { x = 0, y = 0 } = {},
    style: { pointSize, lineWidth },
  } = props;

  const [pointList, setPointList] = React.useState([]);

  const MAX_POINT_NUM = 100;

  function appendPoint() {
    const newPointList =
      pointList.length < MAX_POINT_NUM
        ? pointList.concat({ x: x, y: y })
        : pointList;

    setPointList(newPointList);
  }

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
      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={pointList}
        points={pointList}
        lineStyle={{ color: "black", width: lineWidth }}
        pointStyle={{ color: "red", pointSize: pointSize }}
        canvasStyle={{ width: 1600, height: 500 }}
      />

      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(pointList)}</p>
    </div>
  );
}
