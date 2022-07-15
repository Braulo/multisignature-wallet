import { FC, PropsWithChildren } from "react";

interface IButton {
  className?: string;
  onClick?: () => void;
}

const Button: FC<PropsWithChildren & IButton> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " +
          `${className}`
        }
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
