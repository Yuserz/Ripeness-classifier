import { createContext } from "react";

const SettingsContext = createContext({
  autoPlaySpeech: true,
  cameraShutter: true,
  saveCaptured: true,
});

export default SettingsContext;
