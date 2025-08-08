import _ from 'lodash';

export default function emptyArrayIfUndefined(array) {
  return _.isUndefined(array) ? [] : array;
}
