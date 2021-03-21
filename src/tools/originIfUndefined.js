import _ from "lodash";

export default function originIfUndefined(displacement) {
  return _.isUndefined(displacement) ? { x: 0, y: 0 } : displacement;
}
