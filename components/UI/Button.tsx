import { FC, PropsWithChildren } from "react";

interface IButton {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: any;
}

const Button: FC<PropsWithChildren & IButton> = ({
  children,
  onClick,
  className,
  disabled,
  type,
}) => {
  return (
    <>
      <button
        className={
          "bg-primary font-bold py-2 px-4 rounded text-white " + `${className}`
        }
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
