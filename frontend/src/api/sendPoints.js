import { pointsToArray } from "./parsePoints";
import socketio from "socket.io-client";
const apiUrl = "http://localhost:5000";

export default function sendPoints(points) {
  const positionArray = pointsToArray(points);

  const socket = socketio.connect(apiUrl);

  socket.emit("pivotal points", positionArray);
}
