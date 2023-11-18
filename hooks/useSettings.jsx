import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

export const useSettings = () => {
  const { settings, onApplySettings } = useContext(SettingsContext);

  return { settings, onApplySettings };
};
