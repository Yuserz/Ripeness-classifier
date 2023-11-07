import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useTheme = () => {
  const { theme, onThemeChange } = useContext(ThemeContext);
  return { theme, onThemeChange };
};
