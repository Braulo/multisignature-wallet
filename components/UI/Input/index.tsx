import { FC } from "react";

interface IInput {
  name: string;
  placeholder?: string;
  onChange: (event) => void;
  value: string;
}

const Input: FC<IInput> = (props) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.name}
      >
        {props.name}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={props.name}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      ></input>
    </>
  );
};

export default Input;
