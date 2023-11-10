import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import * as Speech from "expo-speech";
import { useState, useEffect } from "react";

export const Listen = ({ context }) => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

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
        <Ionicons name="volume-mute" size={28} color={theme.primary} />
      ) : (
        <Ionicons name="volume-high-outline" size={28} color={theme.primary} />
      )}

      <Text style={style.text}>Listen</Text>
    </Pressable>
  );
};
