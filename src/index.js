import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import Toggle from "./components/toggleSwitch";
import _ from "lodash";
import React, { useRef, useEffect, useState } from "react";
import { positionParser } from "./api/parsePoints";
import SelectBox from "./components/selectBox";
import MultipleInputBox from "./components/multipleInputBox";

import "./index.css";
import PositionSetter from "./pointSetter";

import emptyArrayIfUndefined from "./tools/emptyArrayIfUndefined";
import extractVariable from "./tools/extractVariable";

import {
  ABSOLUTE_ANIMATION_OPTIONS,
  RELATIVE_ANIMATION_OPTIONS,
  INTERPOLATION_OPTIONS,
} from "./constant";

const pivotalPoints = [];

function App() {
  const [animated, setAnimated] = useState(false);
  const [pivotalP, setPivotalP] = useState([]);
  const [plotP, setPlotP] = useState({ path: [], pivotal: [] });

  const absoluteAnimationRef = useRef(ABSOLUTE_ANIMATION_OPTIONS[0]);
  const relativeAnimationRef = useRef(RELATIVE_ANIMATION_OPTIONS[0]);
  const absoluteAnimationVariableRef = useRef(
    absoluteAnimationRef.current.variable
  );
  const relativeAnimationVariableRef = useRef(
    relativeAnimationRef.current.variable
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

  const setAbsoluteAnimationRef = (obj) => {
    absoluteAnimationRef.current = obj;
  };
  const setRelativeAnimationRef = (obj) => {
    relativeAnimationRef.current = obj;
  };

  const setAbsoluteAnimationVariableRef = (arr) => {
    absoluteAnimationVariableRef.current = arr;
  };

  const setRelativeAnimationVariableRef = (arr) => {
    relativeAnimationVariableRef.current = arr;
  };

  useEffect(() => {
    const newIndex = _.findIndex(
      ABSOLUTE_ANIMATION_OPTIONS,
      (o) => o.label === absoluteAnimationRef.current.label
    );

    setAbsoluteAnimationVariableRef(
      ABSOLUTE_ANIMATION_OPTIONS[newIndex].variable
    );
  }, [absoluteAnimationRef.current]);

  useEffect(() => {
    const newIndex = _.findIndex(
      RELATIVE_ANIMATION_OPTIONS,
      (o) => o.label === relativeAnimationRef.current.label
    );

    setRelativeAnimationVariableRef(
      RELATIVE_ANIMATION_OPTIONS[newIndex].variable
    );
  }, [relativeAnimationRef.current]);

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

  const setInterpolationMethod = (selectedOption) => {
    document
      .getElementById("root")
      .setAttribute("interpolationMethod", selectedOption.value);
  };

  return (
    <div>
      <div class="select-container">
        <Toggle id="1st" name="Animated?" onToggle={setAnimated} />
        <div id="2nd">
          <SelectBox
            name="Absolute Animation"
            label="absoluteAnimation"
            options={ABSOLUTE_ANIMATION_OPTIONS}
            onChange={setAbsoluteAnimationRef}
          ></SelectBox>
          <MultipleInputBox
            inputsInfo={emptyArrayIfUndefined(
              absoluteAnimationVariableRef.current
            )}
            handleInputChange={setAbsoluteAnimationVariableRef}
          ></MultipleInputBox>
        </div>
        <div id="3rd">
          <SelectBox
            name="Relative Animation"
            label="relativeAnimation"
            options={RELATIVE_ANIMATION_OPTIONS}
            onChange={setRelativeAnimationRef}
          ></SelectBox>
          <MultipleInputBox
            inputsInfo={emptyArrayIfUndefined(
              relativeAnimationVariableRef.current
            )}
            handleInputChange={setRelativeAnimationVariableRef}
          ></MultipleInputBox>
        </div>
        <div id="4th">
          <SelectBox
            name="Interpolation Method"
            label="interpolationMethod"
            options={INTERPOLATION_OPTIONS}
            onChange={setInterpolationMethod}
          ></SelectBox>
        </div>
      </div>

      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 10, lineWidth: 5 }}
          animated={animated}
          relativeAnimation={relativeAnimationRef.current.value(
            extractVariable(relativeAnimationVariableRef)
          )}
          absoluteAnimation={absoluteAnimationRef.current.value(
            extractVariable(absoluteAnimationVariableRef)
          )}
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
