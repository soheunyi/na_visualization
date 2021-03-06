import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "./styles.css";
import { PositionLabel } from "./PositionLabel";
import PositionSetter from "./pointSetter";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactCursorPosition>
        {/* <PositionLabel style={{ pointSize: 10, lineWidth: 5 }} /> */}
        <PositionSetter style={{ pointSize: 10, lineWidth: 5 }} />
      </ReactCursorPosition>
    </DndProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
