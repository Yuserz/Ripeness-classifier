import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { useSpeech } from "../hooks/useSpeech";

export const Listen = ({ context }) => {
  const { isPlaying, speak } = useSpeech();
  const { theme, getInvertedColor } = useTheme();
  const color = getInvertedColor() === "dark" ? theme.primary : theme.text;

  const style = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 6,
      opacity: 0.8,
    },
    text: {
      color: color,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Pressable style={style.container} onPress={() => speak(context)}>
      {isPlaying ? (
        <Ionicons name="volume-mute" size={28} color={color} />
      ) : (
        <Ionicons name="volume-high-outline" size={28} color={color} />
      )}

      <Text style={style.text}>Listen</Text>
    </Pressable>
  );
};
