import ReactDOM from "react-dom";
import ReactCursorPosition from "react-cursor-position";
import Toggle from "./components/toggleSwitch";
import { useState } from "react";

import "./styles.css";
import PositionSetter from "./pointSetter";

function App() {
  const [animated, setAnimated] = useState(false);
  return (
    <div>
      <Toggle onToggle={setAnimated} />
      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 10, lineWidth: 5 }}
          animated={animated}
          animation={(animationFrameCount) => ({
            x: 100 * Math.cos((animationFrameCount % 60) * (Math.PI / 30)),
            y: 100 * Math.sin((animationFrameCount % 60) * (Math.PI / 30)),
          })}
        />
      </ReactCursorPosition>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
