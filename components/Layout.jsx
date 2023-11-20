import { View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Layout = (props) => {
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();

  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: top + 36,
    },
  });

  return (
    <View style={[style.container, props.style]} {...props}>
      {props.children}
    </View>
  );
};
