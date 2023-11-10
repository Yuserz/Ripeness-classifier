import { View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

export const Layout = (props) => {
  const { theme } = useTheme();

  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 36,
    },
  });

  return (
    <SafeAreaView>
      <View style={[style.container, props.style]} {...props}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};
