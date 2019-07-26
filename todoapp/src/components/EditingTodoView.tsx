import * as React from "react";
import Input from "./Input";
import Spinner from "./Spinner";

interface ValueType {
  type: string | "";
}

type EditingTodoViewProps = {
  isUpdatingTodo: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (e: React.MouseEvent<HTMLElement>) => void;
  value: ValueType;
};

const EditingTodoView: React.FC<EditingTodoViewProps> = ({
  isUpdatingTodo,
  handleChange,
  handleUpdate,
  value
}) => {
  return (
    <div>
      <Input handleChange={handleChange} value={value.type} />
      <button className="btn" onClick={handleUpdate}>
        Update
      </button>
      {isUpdatingTodo ? <Spinner /> : null}
    </div>
  );
};

export default EditingTodoView;
