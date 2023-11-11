import ThemeContext from "../context/ThemeContext";
import { useState } from "react";
import { Default } from "../constants/Themes";

export const ThemeProvider = ({ children, value }) => {
  const { mode, setMode, colorScheme, getInvertedColor } = value;
  const [selected, setSelected] = useState(Default);
  const [theme, setTheme] = useState(Default[colorScheme]);

  const onThemeChange = (theme) => {
    if (mode === "system") {
      setSelected(theme);
      setTheme(theme[colorScheme]);
      return;
    }
    setSelected(theme);
    setTheme(theme[mode]);
  };

  const onModeChange = (value) => {
    if (value === "system") {
      setTheme(selected[colorScheme]);
      setMode(value);
      return;
    }
    setTheme(selected[value]);
    setMode(value);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, mode, onThemeChange, onModeChange, getInvertedColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
