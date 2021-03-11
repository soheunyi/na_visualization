import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";

import "./styles.css";
import PositionSetter from "./pointSetter";

function App() {
  return (
    <div>
      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter style={{ pointSize: 10, lineWidth: 5 }} />
      </ReactCursorPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
