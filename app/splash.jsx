import { StyleSheet, Pressable, View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useTheme } from "../hooks/useTheme";

export default function Splash() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const themeStyle = StyleSheet.create({
    container: { backgroundColor: theme.primary },
    text: { color: theme.secondary },
    buttonText: { color: theme.primary },
    button: {
      alignItems: "center",
      borderRadius: 30,
      width: 170,
      backgroundColor: theme.secondary,
    },
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
        <Pressable
          style={themeStyle.button}
          onPress={() => {
            navigation.navigate("camera");
          }}
        >
          <Text style={[styles.btnText, themeStyle.buttonText]}>START</Text>
        </Pressable>
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
});
