import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "../../hooks/useTheme";

export default function Splash() {
  const { theme } = useTheme();

  const themeStyle = StyleSheet.create({
    container: { backgroundColor: theme.primary },
    text: { color: theme.background },
  });

  return (
    <View style={[styles.container, themeStyle.container]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, themeStyle.text]}>
          Intelligent Imaging System{" "}
          <Text style={styles.titleText2}>for Ripeness Determination of </Text>{" "}
          Musa Acuminata Colla Banana
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Link href={"/camera"} asChild>
          {/* <Link href={"/scan-tab"} asChild> */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>START</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleText: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
  },
  titleText2: {
    fontSize: 20,
  },
  btnText: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  btnContainer: {
    height: "20%",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 150,
  },
});
