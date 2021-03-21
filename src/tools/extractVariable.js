import emptyArrayIfUndefined from "./emptyArrayIfUndefined";

export default function extractVariable(variableRef) {
  const variable = {};
  const target = emptyArrayIfUndefined(variableRef.current);
  target.forEach((singleV) => {
    variable[singleV.name] = singleV.value;
  });
  return variable;
}
