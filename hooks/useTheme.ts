import { useEffect, useState } from "react";

export const useTheme = () => {
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  const [currentTheme, setCurrentThemeState] = useState<string | null>("");

  const toggleTheme = () => {
    currentTheme === "light" ? setTheme("dark") : setTheme("light");
  };

  const setTheme = (theme: string) => {
    if (currentTheme) {
      document.body.classList.remove(currentTheme);
    }

    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    setCurrentThemeState(theme);
  };

  return {
    toggleTheme,
    currentTheme,
  };
};
