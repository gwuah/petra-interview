import * as React from "react";

type NormalTodoViewProps = {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  toggleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value: {
    type: string;
  };
};

const checkedStyle = {
  textDecoration: "line-through"
};

const NormalTodoView: React.FC<NormalTodoViewProps> = ({
  toggleCheck,
  handleClick,
  checked,
  value
}) => {
  return (
    <div style={checked ? checkedStyle : {}}>
      <input type="checkbox" onChange={toggleCheck} />
      <h3>{value.type}</h3>
      <button onClick={handleClick}>Edit</button>
    </div>
  );
};

export default NormalTodoView;
