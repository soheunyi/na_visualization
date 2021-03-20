import InputBox from "./InputBox";
import _ from "lodash";

export default function MultipleInputBox(props) {
  function handleInputChange(inputChange) {
    const newInputsInfo = props.inputsInfo;
    const updateIndex = _.findIndex(
      props.inputsInfo,
      (info) => info.name == inputChange.name
    );
    newInputsInfo[updateIndex] = inputChange;
    props.handleInputChange(newInputsInfo);
  }

  return props.inputsInfo.map((info) => (
    <InputBox onChange={handleInputChange} {...info}></InputBox>
  ));
}
