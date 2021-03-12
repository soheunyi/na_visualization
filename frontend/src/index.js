import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import Toggle from "./components/toggleSwitch";

import "./styles.css";
import PositionSetter from "./pointSetter";

function App() {
  return (
    <div>
      <Toggle />
      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 10, lineWidth: 5 }}
          animated={true}
          animation={(position, _) => ({
            x: position.x + 10,
            y: position.y + 10,
          })}
        />
      </ReactCursorPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
