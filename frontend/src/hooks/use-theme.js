import { useEffect, useState } from "react";
import { THEMES } from "@/components/theme-selector/themes";

const useTheme = (themeName = "dark") => {
  const [theme, setTheme] = useState(undefined);

  useEffect(() => {
    const getThemeName = localStorage.getItem("theme");

    if (getThemeName) {
      const newTheme = THEMES.get(getThemeName);
      setTheme(newTheme);
    } else {
      updateTheme(themeName);
    }
  }, [themeName]);

  const updateTheme = (value) => {
    const newTheme = THEMES.get(value);

    setTheme(newTheme);
    value ? localStorage.setItem("theme", value) : null;
  };

  return [theme, updateTheme];
};

export default useTheme;
