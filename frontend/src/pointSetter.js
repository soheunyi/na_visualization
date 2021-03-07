import React from "react";
import drawFunctionPoints from "./drawing/drawFunctionPoints";
import FloatingPoint from "./components/floatingPoint";
import PointCanvas from "./canvas/pointCanvas";
import fetchPoints from "./api/fetchPoints";
import socketio from "socket.io-client";
import sendPoints from "./api/sendPoints";
import { arrayToPoints } from "./api/parsePoints";
import _ from "lodash";

class PositionSetter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.appendPoint = this.appendPoint.bind(this);
    this.state = { pivotalPoints: [], pathPoints: [] };
  }

  componentDidMount() {
    const apiUrl = "http://localhost:5000/";

    this.socket = socketio.connect(apiUrl);
    this.socket.on("path points", (newPathArray) => {
      console.log(arrayToPoints(newPathArray));

      this.setState(() => ({
        pathPoints: arrayToPoints(newPathArray),
      }));
    });
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.pivotalPoints, this.state.pivotalPoints)) {
      sendPoints(this.state.pivotalPoints);
      console.log(this.state.pivotalPoints);
    }
  }

  handleDrag(draggedPoint) {
    const newPivotalPoints = this.state.pivotalPoints.map((point) => {
      if (point.key !== draggedPoint.key) {
        return point;
      } else {
        return draggedPoint;
      }
    });

    this.setState({ pivotalPoints: newPivotalPoints });
  }

  appendPoint() {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    const { position } = this.props;
    const newPivotalPoints =
      this.state.pivotalPoints.length < MAX_POINT_NUM
        ? this.state.pivotalPoints.concat({ key, position })
        : this.state.pivotalPoints;

    this.setState({ pivotalPoints: newPivotalPoints });
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
        {this.state.pivotalPoints.map((point) => {
          return (
            <FloatingPoint
              handleDrag={_.throttle(this.handleDrag, 10000)}
              deletePoint={this.deletePoint}
              point={point}
              pointStyle={{ pointSize: 10, color: "yellow" }}
            />
          );
        })}

        <PointCanvas
          draw={drawFunctionPoints}
          pathPoints={this.state.pathPoints}
          points={this.state.pivotalPoints}
          lineStyle={{ color: "black", width: lineWidth }}
          pointStyle={{ color: "red", pointSize: pointSize }}
          canvasStyle={{ width: 1600, height: 500 }}
        />

        <p>{JSON.stringify(this.props)}</p>
        <p>{JSON.stringify(this.state.pivotalPoints)}</p>
      </div>
    );
  }
}
export default PositionSetter;
