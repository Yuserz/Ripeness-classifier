import { View, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { themes } from "../constants/Themes";
import { Entypo } from "@expo/vector-icons";

export const ThemeSelector = () => {
  const { theme, onThemeChange, getInvertedColor } = useTheme();

  return (
    <View style={styles.container}>
      {themes.map((t, index) => {
        const temp = t.light;

        const themeStyle = StyleSheet.create({
          background: {
            backgroundColor: temp.primary,
            borderColor:
              getInvertedColor() === "dark"
                ? "rgba(0, 0, 0, .2)"
                : "rgba(255, 255, 255, .3)",
          },
        });

        return (
          <Pressable
            key={index}
            style={[styles.preview, themeStyle.background]}
            onPress={() => onThemeChange(t)}
          >
            {theme === t[getInvertedColor() === "light" ? "dark" : "light"] && (
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
