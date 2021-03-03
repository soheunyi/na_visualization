import React from "react";
import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import CronCanvas from "./canvas/cronCanvas";
import animatedCircleDraw from "./drawing/animatedCircle";
import linearInterpolation from "./drawing/linearInterpolation";

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
  } = props;

  const initialPointList = [];
  const [pointList, setPointList] = React.useState(initialPointList);

  const MAX_POINT_NUM = 10;

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
      <PointCanvas
        draw={linearInterpolation}
        points={pointList}
        lineStyle={{ color: "black", width: 10 }}
        style={{ width: 200, height: 100 }}
      />
      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(pointList)}</p>

      <div
        style={{
          position: "absolute",
          borderRadius: "100%",
          left: x - 10,
          top: y - 10,
          width: 20,
          height: 20,
          background: "hotpink",
        }}
      />
      {pointList.map((point) => (
        <div
          style={{
            position: "absolute",
            borderRadius: "100%",
            left: point.x - 10,
            top: point.y - 10,
            width: 20,
            height: 20,
            background: "hotpink",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  return (
    <div>
      <CronCanvas draw={animatedCircleDraw} />
      <ReactCursorPosition>
        <PositionLabel />
      </ReactCursorPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
