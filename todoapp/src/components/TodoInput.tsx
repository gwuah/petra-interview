import * as React from "react";
import Input from "./Input";

type TodoInputProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todoValue: string;
};

const TodoInput: React.FunctionComponent<TodoInputProps> = ({
  handleChange,
  handleClick,
  todoValue
}) => {
  return (
    <div>
      <Input handleChange={handleChange} value={todoValue} />
      <button onClick={handleClick}>Add Todo</button>
    </div>
  );
};

export default TodoInput;
