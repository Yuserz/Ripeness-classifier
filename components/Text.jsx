import Native from "react-native";
import { useTheme } from "../hooks/useTheme";

export const Text = (props) => {
  const { theme } = useTheme();
  const { style, children, ...o } = props;

  const color = Native.StyleSheet.create({
    text: { color: theme.text },
  });

  return (
    <Native.Text style={[style, color.text]} {...o}>
      {children}
    </Native.Text>
  );
};
