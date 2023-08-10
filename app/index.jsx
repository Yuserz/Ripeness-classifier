import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

//components
import View from "../components/ThemedView";
import Text from "../components/ThemedText";

export default function index() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Intelligent Imaging System{" "}
          <Text style={styles.titleText2}>for Ripeness Determination of </Text>{" "}
          Musa Acuminata Colla Banana
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Link href={"/experiment"} asChild>
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
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
  },
  titleText2: {
    fontSize: 20,
  },
  btnText: {
    fontSize: 20,
    padding: 20,
    color: "#000",
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
