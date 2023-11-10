import { createContext } from "react";
import { Default } from "../constants/Themes";

const ThemeContext = createContext({
  theme: Default.light,
  mode: "system",
  onThemeChange: () => {},
  onModeChange: () => {},
});

export default ThemeContext;
