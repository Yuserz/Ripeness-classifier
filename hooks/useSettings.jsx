import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

export const useSettings = () => {
  const { autoPlaySpeech, cameraShutter, saveCaptured, onApplySettings } =
    useContext(SettingsContext);

  return {
    autoPlaySpeech,
    cameraShutter,
    saveCaptured,
    onApplySettings,
  };
};
