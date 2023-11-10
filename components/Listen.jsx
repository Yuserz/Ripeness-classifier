import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import * as Speech from "expo-speech";
import { useState, useEffect } from "react";

export const Listen = ({ context }) => {
  const { theme, mode } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const color = mode === "light" ? theme.primary : theme.text;

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

  const speak = async () => {
    if (context) {
      if (await Speech.isSpeakingAsync()) {
        Speech.stop();
        return;
      }
      Speech.speak(context, {
        onStopped: () => setIsPlaying(false),
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
      });
    }
  };

  return (
    <Pressable style={style.container} onPress={speak}>
      {isPlaying ? (
        <Ionicons name="volume-mute" size={28} color={color} />
      ) : (
        <Ionicons name="volume-high-outline" size={28} color={color} />
      )}

      <Text style={style.text}>Listen</Text>
    </Pressable>
  );
};
