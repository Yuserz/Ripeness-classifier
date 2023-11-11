import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

export const Button = (props) => {
  const { theme, getInvertedColor } = useTheme();

  const { style, icon, ...otherProps } = props;

  const themeStyle = StyleSheet.create({
    button: {
      backgroundColor: theme.accent,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      borderRadius: 8,
      width: 200,
    },
    text: {
      color: getInvertedColor() === "dark" ? theme.background : theme.text,
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <Pressable style={[themeStyle.button, style]} {...otherProps}>
      <Text style={themeStyle.text}>{props.children}</Text>
    </Pressable>
  );
};
