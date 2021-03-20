export default function InputBox(props) {
  const handleInputChange = (event) => {
    const target = event.target;
    const type = target.type;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    props.handleInputChange({ name, value, type });
  };

  return (
    <form>
      <label>
        {props.name}:
        <input
          type={props.type}
          name={props.name}
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
}
