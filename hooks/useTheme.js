import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useTheme = () => {
  const { theme, onThemeChange, mode, onModeChange } = useContext(ThemeContext);
  return { theme, onThemeChange, mode, onModeChange };
};
