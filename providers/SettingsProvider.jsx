import SettingsContext from "../context/SettingsContext";
import { useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../utils/asyncStorage";

const KEY = "settings";
const DEFAULT = {
  autoPlaySpeech: true,
  cameraShutter: true,
  saveCaptured: true,
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT);

  useEffect(() => {
    const load = async () => {
      const res = await getItem(KEY);
      if (!res) await setItem(KEY, settings);
      else setSettings(res);
    };
    load();
  }, []);

  const onApplySettings = async (value) => {
    setSettings((prev) => ({ ...prev, value }));
    await setItem(KEY, { ...settings, ...value });
  };

  return (
    <SettingsContext.Provider
      value={{
        autoPlaySpeech: settings.autoPlaySpeech,
        cameraShutter: settings.cameraShutter,
        saveCaptured: settings.saveCaptured,
        onApplySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
