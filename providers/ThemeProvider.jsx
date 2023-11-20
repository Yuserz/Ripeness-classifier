import ThemeContext from "../context/ThemeContext";
import { useState, useLayoutEffect } from "react";
import { Default } from "../constants/Themes";
import { getItem, removeItem, setItem } from "../utils/asyncStorage";
import { themes } from "../constants/Themes";

const KEY = "theme";
export const ThemeProvider = ({ children, value }) => {
  const { mode, setMode, colorScheme, getInvertedColor, onThemeLoad } = value;
  const [selected, setSelected] = useState(Default);
  const [theme, setTheme] = useState(Default[colorScheme]);

  useLayoutEffect(() => {
    const load = async () => {
      const res = await getItem(KEY);
      if (!res) {
        await setItem(KEY, { theme: "default", mode });
        onThemeLoad();
      } else {
        const t = themes.find((t) => t.id === res.theme).theme;
        setMode(res.mode);

        if (res.mode === "system")
          setTheme(t[getInvertedColor() === "light" ? "dark" : "light"]);
        else setTheme(t[res.mode]);

        setSelected(t);

        onThemeLoad();
      }
    };
    load();
  }, []);

  const onThemeChange = async (theme) => {
    if (mode === "system") {
      setSelected(theme.theme);
      setTheme(theme.theme[colorScheme]);
      await setItem(KEY, { theme: theme.id, mode });
      return;
    }
    setSelected(theme.theme);
    setTheme(theme.theme[mode]);
    await setItem(KEY, { theme: theme.id, mode });
  };

  const onModeChange = async (value) => {
    const res = await getItem(KEY);
    if (value === "system") {
      setTheme(selected[colorScheme]);
      setMode(value);
      await setItem(KEY, { ...res, mode: value });
      return;
    }
    setTheme(selected[value]);
    setMode(value);
    await setItem(KEY, { ...res, mode: value });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, mode, onThemeChange, onModeChange, getInvertedColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
