import { View, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { themes } from "../constants/Themes";
import { Entypo } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
export const ThemeSelector = () => {
  const colorScheme = useColorScheme();
  const { theme, mode, onThemeChange } = useTheme();

  return (
    <View style={styles.container}>
      {themes.map((t, index) => {
        const temp = t.light;

        const background = StyleSheet.create({
          background: { backgroundColor: temp.primary },
        });

        return (
          <Pressable
            key={index}
            style={[styles.preview, background.background]}
            onPress={() => onThemeChange(t)}
          >
            {theme === t[mode === "system" ? colorScheme : mode] && (
              <Entypo name="check" size={30} color={temp.background} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  preview: {
    width: 80,
    height: 80,
    backgroundColor: "black",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
});
