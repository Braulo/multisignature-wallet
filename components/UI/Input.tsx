import { FC } from "react";

interface IInput {
  name: string;
  labelName?: string;
  placeholder?: string;
  onChange: (event) => void;
  value: string;
  type: string;
  onBlur: (event) => void;
}

const Input: FC<IInput> = (props) => {
  return (
    <>
      <label className="block text-sm font-bold" htmlFor={props.name}>
        {props.labelName}
      </label>
      <input
        className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </>
  );
};

export default Input;
