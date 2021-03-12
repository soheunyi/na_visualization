import React, { useCallback, useRef, useEffect, useState } from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import socketio from "socket.io-client";
import { arrayToPoints, pointsToArray } from "./api/parsePoints";
import _ from "lodash";

export default function PositionSetter(props) {
  const [pivotalPoints, setPivotalPoints] = useState([]);
  const [pathPoints, setPathPoints] = useState([]);
  const apiUrl = "http://localhost:5000";

  const connection = useRef(null);

  useEffect(() => {
    connection.current = socketio.connect(apiUrl);
    connection.current.on("path points", (newPathArray) =>
      setPathPoints(arrayToPoints(newPathArray))
    );

    return () => connection.current.disconnect();
  }, []);

  useEffect(() => {
    const positionArray = pointsToArray(pivotalPoints);
    connection.current.emit("pivotal points", positionArray);
  }, [pivotalPoints]);

  const throttledHandleDragRef = useRef();
  throttledHandleDragRef.current = (draggedPoint) => {
    const newPivotalPoints = pivotalPoints.map((point) => {
      if (point.key !== draggedPoint.key) {
        return point;
      } else {
        return draggedPoint;
      }
    });

    setPivotalPoints(newPivotalPoints);
  };

  const throttledHandleDrag = useCallback(
    _.throttle((...args) => throttledHandleDragRef.current(...args), 10),
    []
  );

  const appendPoint = () => {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    const { position } = props;
    const newPivotalPoints =
      pivotalPoints.length < MAX_POINT_NUM
        ? pivotalPoints.concat({ key, position })
        : pivotalPoints;

    setPivotalPoints(newPivotalPoints);
  };

  const { animated, animation, lineWidth, pointSize } = props;
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
      {pivotalPoints.map((point) => {
        return (
          <FloatingPoint
            animated={animated}
            animation={animation}
            handleDrag={throttledHandleDrag}
            point={point}
            pointStyle={{ pointSize: 10, color: "yellow" }}
          />
        );
      })}

      <PointCanvas
        draw={drawFunctionPoints}
        pathPoints={pathPoints}
        points={pivotalPoints}
        lineStyle={{ color: "black", width: lineWidth }}
        pointStyle={{ color: "red", pointSize: pointSize }}
        canvasStyle={{ width: 1600, height: 1000 }}
      />

      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(pivotalPoints)}</p>
    </div>
  );
}
