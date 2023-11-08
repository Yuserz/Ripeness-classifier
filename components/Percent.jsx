import Native from "react-native";
import { useTheme } from "../hooks/useTheme";

export const Percent = (props) => {
  const { theme } = useTheme();
  const { style, percent, ...o } = props;

  const themeStyle = Native.StyleSheet.create({
    text: { color: theme.accent, fontWeight: "bold", fontSize: 72 },
    symbol: { fontWeight: "normal", fontSize: 36 },
  });

  return (
    <Native.Text style={[style, themeStyle.text]} {...o}>
      {percent}
      <Native.Text style={themeStyle.symbol}>%</Native.Text>
    </Native.Text>
  );
};
