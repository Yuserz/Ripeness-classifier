import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export const Listen = () => {
  const { theme } = useTheme();

  const style = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 6,
      opacity: 0.7,
    },
    text: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <View style={style.container}>
      <Ionicons name="volume-high-outline" size={28} color={theme.primary} />
      <Text style={style.text}>Listen</Text>
    </View>
  );
};
