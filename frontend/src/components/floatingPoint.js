import React, { useMemo, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import _ from "lodash";

export default function FloatingPoint(props) {
  const initialPosition = useMemo(() => props.point.position, []);
  const initialAnimationFrameCount = useMemo(
    () => props.animationFrameCount,
    []
  );
  const animationDisplacementRef = useRef();

  const [dragData, setDragData] = useState({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    lastX: 0,
    lastY: 0,
  });

  const updatePivotalPoint = () => {
    const { key } = props.point;
    const animationDisplacement = _.isUndefined(
      animationDisplacementRef.current
    )
      ? { x: 0, y: 0 }
      : animationDisplacementRef.current;

    const newPosition = {
      x: initialPosition.x + animationDisplacement.x + dragData.x,
      y: initialPosition.y + animationDisplacement.y + dragData.y,
    };
    const newPoint = { key, position: newPosition };
    props.handleDrag(newPoint);
  };

  const { animated, animation, animationFrameCount } = props;

  useEffect(() => {
    if (animated) {
      animationDisplacementRef.current = animation(
        animationFrameCount - initialAnimationFrameCount
      );
      updatePivotalPoint();
    }
  }, [animationFrameCount]);

  const handleDrag = (_event, dragData) => {
    setDragData(dragData);
    updatePivotalPoint();
  };

  const { pointSize, color } = props.pointStyle;
  const animationDisplacement = _.isUndefined(animationDisplacementRef.current)
    ? { x: 0, y: 0 }
    : animationDisplacementRef.current;

  return (
    <Draggable onDrag={handleDrag}>
      <div
        className="drag-wrapper"
        style={{
          position: "absolute",
          left: initialPosition.x + animationDisplacement.x - pointSize,
          top: initialPosition.y + animationDisplacement.y - pointSize,
          width: 2 * pointSize,
          height: 2 * pointSize,
          borderRadius: "100%",
          background: color,
        }}
      ></div>
    </Draggable>
  );
}
