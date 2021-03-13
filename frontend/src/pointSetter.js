import React, { useCallback, useRef, useEffect, useState } from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import socketio from "socket.io-client";
import { arrayToPoints, pointsToArray } from "./api/parsePoints";
import _ from "lodash";

const pivotalPoints = [];

export default function PositionSetter(props) {
  const [pp, setPivotalPoints] = useState([]);
  const [pathPoints, setPathPoints] = useState([]);
  const apiUrl = "http://localhost:5000";

  const connection = useRef(null);

  useEffect(() => {
    connection.current = socketio.connect(apiUrl);
    connection.current.on("path points", (newPathArray) =>
      setPathPoints(arrayToPoints(newPathArray))
    );

    const interval = setInterval(() => {
      setPivotalPoints([...pivotalPoints]);
    }, 1000 / 60);

    return () => {
      connection.current.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const positionArray = pointsToArray(pp);
    connection.current.emit("pivotal points", positionArray);
  }, [pp]);

  const throttledHandleDragRef = useRef();
  throttledHandleDragRef.current = (draggedPoint) => {
    const updateIndex = _.findIndex(
      pivotalPoints,
      (p) => p.key === draggedPoint.key
    );
    pivotalPoints[updateIndex] = draggedPoint;
  };

  const throttledHandleDrag = useCallback(
    _.throttle((...args) => throttledHandleDragRef.current(...args), 10),
    []
  );

  const appendPoint = () => {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    const { position } = props;
    // const newPivotalPoints =
    //   pp.length < MAX_POINT_NUM ? pp.concat({ key, position }) : pp;
    pivotalPoints.push({ position, key });
  };

  const { animated, animation, lineWidth, pointSize } = props;

  const animationFrameCount = Math.floor(Date.now() / 200);

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
      {pp.map((point) => {
        return (
          <FloatingPoint
            animated={animated}
            animation={animation}
            animationFrameCount={animationFrameCount}
            handleDrag={throttledHandleDragRef.current}
            point={point}
            pointStyle={{ pointSize: 10, color: "yellow" }}
          />
        );
      })}
      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={pathPoints}
        points={pp}
        lineStyle={{ color: "black", width: lineWidth }}
        pointStyle={{ color: "red", pointSize: pointSize }}
        canvasStyle={{ width: 1600, height: 1000 }}
      />

      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(pp)}</p>
    </div>
  );
}
