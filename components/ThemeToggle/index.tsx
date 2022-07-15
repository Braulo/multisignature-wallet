import { FC } from "react";
import { MdDarkMode, MdWbSunny } from "react-icons/md";
import { useTheme } from "../../hooks/use-theme";
import Button from "../UI/Button";

const ThemeToggle: FC = () => {
  const { toggleTheme, currentTheme } = useTheme();

  return (
    <>
      <Button onClick={toggleTheme} className="dark:!bg-white !bg-black">
        {currentTheme == "light" ? (
          <MdDarkMode className="text-white" />
        ) : (
          <MdWbSunny className="text-black" />
        )}
      </Button>
    </>
  );
};

export default ThemeToggle;