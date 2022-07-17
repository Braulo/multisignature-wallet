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
          "bg-primary font-bold py-2 px-4 rounded text-white " + `${className}`
        }
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
