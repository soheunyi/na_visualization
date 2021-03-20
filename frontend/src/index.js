import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import Toggle from "./components/toggleSwitch";
import _ from "lodash";
import React, { useRef, useEffect, useState } from "react";
import { pathPointsParser } from "./api/parsePoints";

import "./styles.css";
import PositionSetter from "./pointSetter";

const pivotalPoints = [];

function App(props) {
  const [animated, setAnimated] = useState(false);
  const [pivotalP, setPivotalP] = useState([]);
  const [pathP, setPathP] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPivotalP([...pivotalPoints]);

      setPathP(pathPointsParser(rootElement.getAttribute("pathPoints")));
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDragRef = useRef();
  handleDragRef.current = (draggedPoint) => {
    const updateIndex = _.findIndex(
      pivotalPoints,
      (p) => p.key === draggedPoint.key
    );
    pivotalPoints[updateIndex] = draggedPoint;
  };

  const handleDoubleClickRef = useRef();
  handleDoubleClickRef.current = (position) => {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    if (pivotalPoints.length < MAX_POINT_NUM) {
      pivotalPoints.push({ position, key });
    }
  };

  return (
    <div>
      {props.testString}
      <Toggle onToggle={setAnimated} />
      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 100, lineWidth: 5 }}
          animated={animated}
          animation={(animationFrameCount) => ({
            x:
              100 * Math.cos((animationFrameCount % 60) * (Math.PI / 30)) - 100,
            y: 100 * Math.sin((animationFrameCount % 60) * (Math.PI / 30)),
          })}
          handleDoubleClick={handleDoubleClickRef.current}
          handleDrag={handleDragRef.current}
          pivotalPoints={pivotalP}
          pathPoints={pathP === null ? [] : pathP}
        />
      </ReactCursorPosition>
    </div>
  );
}
const rootElement = document.getElementById("root");
var testString = null;

setInterval(() => {
  const str = "";
  rootElement.setAttribute(
    "pivotalPosition",
    str.concat(
      "[",
      pivotalPoints
        .map((point) => JSON.stringify([point.position.x, point.position.y]))
        .toString(),
      "]"
    )
  );
}, 1000 / 60);

ReactDOM.render(<App testString={testString} />, rootElement);
