import * as React from "react";

type ValueType = string | "";

interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: ValueType;
}

const Input: React.FC<InputProps> = ({ handleChange, value }) => {
  return <input type="text" onChange={handleChange} value={value} />;
};

export default Input;
