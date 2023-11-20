import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { useSpeech } from "../hooks/useSpeech";
import { useSettings } from "../hooks/useSettings";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export const Listen = ({ context }) => {
  const { isPlaying, speak } = useSpeech();
  const { theme, getInvertedColor } = useTheme();
  const { settings } = useSettings();
  const color = getInvertedColor() === "dark" ? theme.primary : theme.text;
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (settings.autoPlaySpeech && isFocused) speak(context);
  }, [settings.autoPlaySpeech, isFocused]);

  return (
    <Pressable style={style.container} onPress={() => speak(context)}>
      {isPlaying ? (
        <Ionicons name="volume-mute" size={28} color={color} />
      ) : (
        <Ionicons name="volume-high-outline" size={28} color={color} />
      )}

      <Text style={style.text}>{isPlaying ? "Stop" : "Listen"}</Text>
    </Pressable>
  );
};
