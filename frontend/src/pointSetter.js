import React from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import { render } from "react-dom";

class PositionSetter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.appendPoint = this.appendPoint.bind(this);

    this.state = { pointList: [] };
  }

  handleDrag(draggedPoint) {
    const newPointList = this.state.pointList.map((point) => {
      if (point.key !== draggedPoint.key) {
        return point;
      } else {
        return draggedPoint;
      }
    });

    this.setState({ pointList: newPointList });
  }

  appendPoint() {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    const { position } = this.props;
    const newPointList =
      this.state.pointList.length < MAX_POINT_NUM
        ? this.state.pointList.concat({ key, position })
        : this.state.pointList;

    this.setState({ pointList: newPointList });
  }

  render() {
    const {
      style: { pointSize, lineWidth },
    } = this.props;

    return (
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          background: "skyblue",
        }}
        onDoubleClick={this.appendPoint}
      >
        {this.state.pointList.map((point) => {
          return (
            <FloatingPoint
              handleDrag={this.handleDrag}
              deletePoint={this.deletePoint}
              point={point}
              pointStyle={{ pointSize: 10, color: "yellow" }}
            />
          );
        })}

        <PointCanvas
          draw={drawFunctionPoints}
          pathPoints={this.state.pointList.map((point) => point.position)}
          points={this.state.pointList.map((point) => point.position)}
          lineStyle={{ color: "black", width: lineWidth }}
          pointStyle={{ color: "red", pointSize: pointSize }}
          canvasStyle={{ width: 1600, height: 500 }}
        />

        <p>{JSON.stringify(this.props)}</p>
        <p>{JSON.stringify(this.state.pointList)}</p>
      </div>
    );
  }
}
export default PositionSetter;
