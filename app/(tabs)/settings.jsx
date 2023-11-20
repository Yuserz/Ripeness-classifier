import {
  Layout,
  Header,
  Text,
  ThemeSelector,
  ModeSelector,
  CheckBox,
} from "../../components";
import { View, StyleSheet } from "react-native";
import { useSettings } from "../../hooks/useSettings";

export default function Settings() {
  const { settings, onApplySettings } = useSettings();

  const handleEvent = (name, value) => {
    onApplySettings({ [name]: value });
  };

  return (
    <Layout>
      <Header>SETTINGS</Header>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Theme Style</Text>
          <ThemeSelector />
        </View>
        <View>
          <Text style={styles.header}>Theme Preference</Text>
          <ModeSelector />
        </View>
        <View>
          <Text style={styles.header}>Text to Speech</Text>
          <CheckBox
            onChange={(value) => handleEvent("autoPlaySpeech", value)}
            value={settings.autoPlaySpeech}
          >
            Auto play result on finish
          </CheckBox>
        </View>
        <View>
          <Text style={styles.header}>Camera</Text>
          {/* <CheckBox
            onChange={(value) => handleEvent("cameraShutter", value)}
            value={controller.cameraShutter}
          >
            Play camera shutter sound
          </CheckBox> */}
          <CheckBox
            onChange={(value) => handleEvent("saveCaptured", value)}
            value={settings.saveCaptured}
          >
            Save captured image on device
          </CheckBox>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    gap: 32,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
  },
  optionText: {
    fontWeight: "normal",
  },
});
