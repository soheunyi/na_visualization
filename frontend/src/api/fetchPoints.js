import { arrayToPoints } from "./parsePoints";
import { useState } from "react";
import socketio from "socket.io-client";

const apiUrl = "http://localhost:5000/";

export default function fetchPoints() {
  return socketio.connect(apiUrl);
}
