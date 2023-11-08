import { StyleSheet, Pressable } from "react-native";
import { Text } from "./Text";

export const SubButton = (props) => {
  const { style, children, ...o } = props;

  return (
    <Pressable style={[currStyle.subButton, style]} {...o}>
      <Text style={currStyle.subButtonText}>{children}</Text>
    </Pressable>
  );
};

const currStyle = StyleSheet.create({
  subButton: {
    marginTop: 36,
  },
  subButtonText: {
    opacity: 0.4,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
