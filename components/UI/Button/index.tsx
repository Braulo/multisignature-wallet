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
          "dark:bg-gray-800 bg-gray-400 dark:text-white text-black font-bold py-2 px-4 rounded " +
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
