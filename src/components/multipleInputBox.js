import InputBox from "./inputBox";
import _ from "lodash";

export default function MultipleInputBox(props) {
  function handleInputChange(inputChange) {
    const newInputsInfo = [...props.inputsInfo];
    const updateIndex = _.findIndex(
      props.inputsInfo,
      (info) => info.name === inputChange.name
    );
    newInputsInfo[updateIndex] = inputChange;
    console.log(newInputsInfo);
    props.handleInputChange(newInputsInfo);
  }

  return (
    <div class="multiple-input-box">
      {props.inputsInfo.map((info) => (
        <InputBox
          handleInputChange={handleInputChange}
          type={info.type}
          name={info.name}
        ></InputBox>
      ))}
    </div>
  );
}
