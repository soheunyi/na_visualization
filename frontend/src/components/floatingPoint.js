import React from "react";
import Draggable from "react-draggable";

class FloatingPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initialPosition: this.props.point.position };
  }
  handleDrag = (event, dragData) => {
    const { key, position } = this.props.point;
    console.log(this.state);
    const newPosition = {
      x: this.state.initialPosition.x + dragData.x,
      y: this.state.initialPosition.y + dragData.y,
    };
    console.log(dragData);
    const newPoint = { key, position: newPosition };
    this.props.handleDrag(newPoint);
  };

  render() {
    const { pointSize, color } = this.props.pointStyle;

    // console.log("yellow");
    // console.log(this.props.point);
    // console.log(x, y);
    return (
      <Draggable onDrag={this.handleDrag}>
        <div
          className="drag-wrapper"
          style={{
            position: "absolute",
            left: this.state.initialPosition.x - pointSize,
            top: this.state.initialPosition.y - pointSize,
            width: 2 * pointSize,
            height: 2 * pointSize,
            borderRadius: "100%",
            background: color,
          }}
        ></div>
      </Draggable>
    );
  }
}

export default FloatingPoint;
