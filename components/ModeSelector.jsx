import { View, StyleSheet, Pressable, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Entypo } from "@expo/vector-icons";

export const ModeSelector = () => {
  const { theme, mode, onModeChange, getInvertedColor } = useTheme();

  const options = [
    { id: "Light", background: "white", text: "black" },
    { id: "Dark", background: "black", text: "white" },
    {
      id: "System",
      background: theme.primary,
      text: getInvertedColor() === "light" ? theme.text : theme.background,
    },
  ];

  const themeStyle = StyleSheet.create({
    border: {
      borderColor:
        getInvertedColor() === "dark"
          ? "rgba(0, 0, 0, .2)"
          : "rgba(255, 255, 255, .2)",
    },
  });

  return (
    <View style={styles.container}>
      {options.map((t, index) => {
        const style = StyleSheet.create({
          background: { backgroundColor: t.background },
          text: { color: t.text, fontSize: 12 },
        });

        return (
          <Pressable
            key={index}
            style={[styles.preview, style.background, themeStyle.border]}
            onPress={() => onModeChange(t.id.toLowerCase())}
          >
            <Text style={style.text}>{t.id}</Text>
            {mode === t.id.toLowerCase() && (
              <Entypo name="check" size={10} color={t.text} />
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
    height: 50,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 10,
    columnGap: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
