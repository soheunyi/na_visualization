import Select from "react-select";
import _ from "lodash";

export default function SelectBox(props) {
  const onChange = (selectedOption) => {
    props.onChange(selectedOption);
  };

  return (
    <div {...props}>
      <p>{props.name}</p>
      <Select options={props.options} onChange={onChange}></Select>
    </div>
  );
}
