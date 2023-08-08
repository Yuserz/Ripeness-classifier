import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

//components
import { colors } from "../../constants/Colors";
import StatusBarStyle from "../../components/StatusBarStyle";

export default function ScanTab() {
  return (
    <View style={styles.container}>
      <StatusBarStyle>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>UPLOAD SCREEN</Text>
          <View style={styles.imageContainer}></View>
          <Text style={styles.text}>
            <Text style={styles.textb}>
              Start classifying bananas' ripeness{" "}
            </Text>{" "}
            by pressing the buttons below.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.captureButton}>
            <Text style={styles.btnText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </StatusBarStyle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
  },
  titleText: {
    textAlign: "center",
    color: colors.primary[0],
    fontSize: 20,
    fontWeight: "bold",
  },
  btnText: {
    fontSize: 20,
    padding: 20,
    color: colors.white[0],
    fontWeight: "bold",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "60%",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    height: "40%",
  },
  captureButton: {
    alignItems: "center",
    backgroundColor: colors.Secondary[0],
    borderRadius: 8,
    width: 170,
  },
  uploadButton: {
    alignItems: "center",
    backgroundColor: colors.Secondary[0],
    borderRadius: 8,
    width: 130,
    color: colors.white[0],
  },
  uploadText: {
    fontSize: 16,
    padding: 14,
    color: colors.white[0],
    fontWeight: "600",
  },

  text: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  textb: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imageContainer: {
    backgroundColor: "#fff",
    height: "60%",
    width: "100%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary[0],
  },
});
