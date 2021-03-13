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
          animated={false}
          animation={(animationFrameCount) => ({
            x: 10 * (animationFrameCount % 10),
            y: 10 * (animationFrameCount % 10),
          })}
        />
      </ReactCursorPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
