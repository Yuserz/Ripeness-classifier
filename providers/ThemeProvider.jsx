import ThemeContext from "../context/ThemeContext";
import { useState, useLayoutEffect } from "react";
import { Default } from "../constants/Themes";
import { getItem, setItem, removeItem } from "../utils/asyncStorage";

const KEY = "theme";
export const ThemeProvider = ({ children, value }) => {
  const { mode, setMode, colorScheme, getInvertedColor } = value;
  const [selected, setSelected] = useState(Default);
  const [theme, setTheme] = useState(Default[colorScheme]);

  useLayoutEffect(() => {
    const load = async () => {
      const res = await getItem(KEY);
      if (!res) {
        await setItem(KEY, { theme, mode });
      } else {
        setTheme(res.theme);
        setMode(res.mode);
      }
    };
    load();
  }, []);

  const onThemeChange = async (theme) => {
    if (mode === "system") {
      setSelected(theme);
      setTheme(theme[colorScheme]);
      await setItem(KEY, { theme: theme[colorScheme], mode });
      return;
    }
    setSelected(theme);
    setTheme(theme[mode]);
    await setItem(KEY, { theme: theme[mode], mode });
  };

  const onModeChange = async (value) => {
    if (value === "system") {
      setTheme(selected[colorScheme]);
      setMode(value);
      await setItem(KEY, { theme: selected[colorScheme], mode: value });
      return;
    }
    setTheme(selected[value]);
    setMode(value);
    await setItem(KEY, { theme: selected[value], mode: value });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, mode, onThemeChange, onModeChange, getInvertedColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
