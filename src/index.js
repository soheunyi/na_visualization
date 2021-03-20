import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import Toggle from "./components/toggleSwitch";
import _ from "lodash";
import React, { useRef, useEffect, useState } from "react";
import { positionParser } from "./api/parsePoints";
import SelectBox from "./components/selectBox";

import "./styles.css";
import PositionSetter from "./pointSetter";

import {
  ABSOLUTE_ANIMATION_OPTIONS,
  RELATIVE_ANIMATION_OPTIONS,
} from "./constant";

const pivotalPoints = [];

function App(props) {
  const [animated, setAnimated] = useState(false);
  const [pivotalP, setPivotalP] = useState([]);
  const [plotP, setPlotP] = useState({ path: [], pivotal: [] });
  const [absoluteAnimation, setAbsoluteAnimation] = useState(
    ABSOLUTE_ANIMATION_OPTIONS[0]
  );
  const [relativeAnimation, setRelativeAnimation] = useState(
    RELATIVE_ANIMATION_OPTIONS[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPivotalP([...pivotalPoints]);
      const plotPosition = rootElement.getAttribute("plotPosition");
      const plotPositionParsed =
        plotPosition == null
          ? { path: [], pivotal: [] }
          : JSON.parse(plotPosition);
      plotPositionParsed.path = positionParser(plotPositionParsed.path);
      plotPositionParsed.pivotal = positionParser(plotPositionParsed.pivotal);
      setPlotP(plotPositionParsed);
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
      <div class="select-container">
        <Toggle id="left" name="Animated?" onToggle={setAnimated} />
        <SelectBox
          id="center"
          name="Absolute Animation"
          label="absoluteAnimation"
          options={ABSOLUTE_ANIMATION_OPTIONS}
          onChange={setAbsoluteAnimation}
        ></SelectBox>
        <SelectBox
          id="right"
          name="Relative Animation"
          label="relativeAnimation"
          options={RELATIVE_ANIMATION_OPTIONS}
          onChange={setRelativeAnimation}
        ></SelectBox>
      </div>

      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 10, lineWidth: 5 }}
          animated={animated}
          relativeAnimation={relativeAnimation.value}
          absoluteAnimation={absoluteAnimation.value}
          handleDoubleClick={handleDoubleClickRef.current}
          handleDrag={handleDragRef.current}
          pivotalPoints={pivotalP}
          plotPoints={plotP === null ? [] : plotP}
        />
      </ReactCursorPosition>
    </div>
  );
}
const rootElement = document.getElementById("root");

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

ReactDOM.render(<App />, rootElement);
