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
    <div style={checked ? checkedStyle : {}} id="Normal-todo-view">
      <input type="checkbox" onChange={toggleCheck} />
      <span className="Todo-value">{value.type}</span>
      <button className="btn" onClick={handleClick}>
        edit
      </button>
    </div>
  );
};

export default NormalTodoView;
