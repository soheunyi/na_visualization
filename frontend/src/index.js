import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "./styles.css";
import PositionSetter from "./pointSetter";
import FunctionalPositionSetter from "./functionalPointSetter";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactCursorPosition>
        <FunctionalPositionSetter style={{ pointSize: 10, lineWidth: 5 }} />
      </ReactCursorPosition>
    </DndProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
