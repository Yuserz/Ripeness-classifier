import { createContext } from "react";
import DefaultTheme from "../constants/Theme";

const ThemeContext = createContext({
  theme: DefaultTheme,
  onThemeChange: () => {},
});

export default ThemeContext;
