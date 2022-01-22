import React, { useMemo, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import addPosition from "../tools/addPosition";
import originIfUndefined from "../tools/originIfUndefined";

export default function FloatingPoint(props) {
  const initialPosition = useMemo(() => props.point.position, []);
  const initialAnimationFrameCount = useMemo(
    () => props.animationFrameCount,
    []
  );
  const absoluteAnimationDisplacementRef = useRef();
  const relativeAnimationDisplacementRef = useRef();

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
    const absoluteAnimationDisplacement = originIfUndefined(
      absoluteAnimationDisplacementRef.current
    );

    const relativeAnimationDisplacement = originIfUndefined(
      relativeAnimationDisplacementRef.current
    );

    const newPosition = addPosition(
      addPosition(initialPosition, dragData),
      addPosition(absoluteAnimationDisplacement, relativeAnimationDisplacement)
    );

    const newPoint = { key, position: newPosition };
    props.handleDrag(newPoint);
  };

  const {
    animated,
    absoluteAnimation,
    relativeAnimation,
    animationFrameCount,
  } = props;

  useEffect(() => {
    if (animated) {
      const absoluteMovement = absoluteAnimation();
      absoluteAnimationDisplacementRef.current = addPosition(
        originIfUndefined(absoluteAnimationDisplacementRef.current),
        absoluteMovement
      );
      relativeAnimationDisplacementRef.current = relativeAnimation(
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
  const absoluteAnimationDisplacement = originIfUndefined(
    absoluteAnimationDisplacementRef.current
  );
  const relativeAnimationDisplacement = originIfUndefined(
    relativeAnimationDisplacementRef.current
  );

  const animationDisplacement = addPosition(
    relativeAnimationDisplacement,
    absoluteAnimationDisplacement
  );

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
          opacity: 0,
        }}
      ></div>
    </Draggable>
  );
}
