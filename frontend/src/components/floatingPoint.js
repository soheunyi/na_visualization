import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import _ from "lodash";

export default function FloatingPoint(props) {
  const [dragExcludedPosition, setDragExcludedPosition] = useState(
    props.point.position
  );
  const [dragData, setDragData] = useState({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    lastX: 0,
    lastY: 0,
  });

  const [start, _setStart] = useState(Date.now());

  const { animated, animation } = props;
  const secondsElapsed = Math.floor((Date.now() - start) / 1000);

  const updatePivotalPoint = () => {
    const { key } = props.point;

    const newPosition = {
      x: dragExcludedPosition.x + dragData.x,
      y: dragExcludedPosition.y + dragData.y,
    };

    const newPoint = { key, position: newPosition };
    // console.log(newPoint);
    props.handleDrag(newPoint);
  };

  // useEffect(() => {
  //   console.log(animation);
  //   if (animated) {
  //     setDragExcludedPosition(animation(dragExcludedPosition, secondsElapsed));
  //     updatePivotalPoint();
  //   }
  //   console.log(dragExcludedPosition);
  // }, [secondsElapsed]);

  const handleDrag = (_event, dragData) => {
    setDragData(dragData);
    updatePivotalPoint();
  };

  const { pointSize, color } = props.pointStyle;
  return (
    <Draggable onDrag={handleDrag}>
      <div
        className="drag-wrapper"
        style={{
          position: "absolute",
          left: dragExcludedPosition.x - pointSize,
          top: dragExcludedPosition.y - pointSize,
          width: 2 * pointSize,
          height: 2 * pointSize,
          borderRadius: "100%",
          background: color,
        }}
      ></div>
    </Draggable>
  );
}
