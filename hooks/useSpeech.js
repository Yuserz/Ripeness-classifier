import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await Speech.getAvailableVoicesAsync();
      const temp = res
        .filter((obj) => obj.language === "en-US")
        .map((obj) => ({
          name: obj.name,
          value: obj.identifier,
        }));
      setVoices(temp);
    };
    load();
  }, []);

  const speak = async (context) => {
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

  return { isPlaying, speak, voices };
};
