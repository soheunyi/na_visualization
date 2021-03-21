export default function InputBox(props) {
  const handleCheckboxChange = (event) => {
    const target = event.target;
    console.log(target.type);
    if (target.type === "checkbox") {
      props.handleInputChange({
        name: target.name,
        value: target.checked,
        type: target.type,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = document.getElementById(
      props.name.concat("-input-form")
    );

    props.handleInputChange({
      name: inputElement.name,
      value: Number(inputElement.value),
      type: inputElement.type,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1%" }}>
      <label>
        {props.name}
        <br />
        <input
          id={props.name.concat("-input-form")}
          type={props.type}
          name={props.name}
          onChange={handleCheckboxChange}
        />
      </label>
    </form>
  );
}
