import React, { useState } from "react";
import Draggable from "react-draggable";
import _ from "lodash";

export default function FloatingPoint(props) {
  const [initialPosition, _setInitialPosition] = useState(props.point.position);

  const handleDrag = (_event, dragData) => {
    const { key } = props.point;

    const newPosition = {
      x: initialPosition.x + dragData.x,
      y: initialPosition.y + dragData.y,
    };

    const newPoint = { key, position: newPosition };
    props.handleDrag(newPoint);
  };

  const { pointSize, color } = props.pointStyle;
  return (
    <Draggable onDrag={handleDrag}>
      <div
        className="drag-wrapper"
        style={{
          position: "absolute",
          left: initialPosition.x - pointSize,
          top: initialPosition.y - pointSize,
          width: 2 * pointSize,
          height: 2 * pointSize,
          borderRadius: "100%",
          background: color,
        }}
      ></div>
    </Draggable>
  );
}
