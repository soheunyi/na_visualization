import React from "react";
import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import CronCanvas from "./canvas/cronCanvas";
import animatedCircleDraw from "./drawing/animatedCircle";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import Draggable from "./components/floatingPoint";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "./styles.css";
import PointCanvas from "./canvas/pointCanvas";

const PositionLabel = (props) => {
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

  const initialFloatingPointsCoordinates = [];
  const [
    floatingPointsCoordinates,
    setFloatingPointsCoordinates,
  ] = React.useState(initialFloatingPointsCoordinates);

  const initialPointList = [];
  const [pointList, setPointList] = React.useState(initialPointList);

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
      onClick={appendPoint}
    >
      <FloatingPoint></FloatingPoint>

      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={pointList}
        // points={pointList}
        lineStyle={{ color: "black", width: lineWidth }}
        pointStyle={{ color: "red", pointSize: pointSize }}
        canvasStyle={{ width: 1600, height: 500 }}
      />
      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(pointList)}</p>

      <div
        style={{
          position: "absolute",
          borderRadius: "100%",
          left: x - pointSize,
          top: y - pointSize,
          width: 2 * pointSize,
          height: 2 * pointSize,
          background: "hotpink",
        }}
      />
    </div>
  );
};

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <CronCanvas draw={animatedCircleDraw} /> */}
      <ReactCursorPosition>
        <PositionLabel style={{ pointSize: 10, lineWidth: 5 }} />
      </ReactCursorPosition>
    </DndProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
