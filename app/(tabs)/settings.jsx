import {
  Layout,
  Header,
  Text,
  ThemeSelector,
  ModeSelector,
} from "../../components";
import { View, StyleSheet } from "react-native";

export default function Settings() {
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
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    gap: 30,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
  },
  optionText: {
    fontWeight: "normal",
  },
});
