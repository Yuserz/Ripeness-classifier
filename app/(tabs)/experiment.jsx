import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const IMAGE_SIZE = 224;
const CLASS_LABELS = {
  0: "green",
  1: "overripe",
  2: "ripe",
};

const BananaDetector = () => {
  const [model, setModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  //Loading model from models folder
  const modelJSON = require("../../assets/model/model.json");
  const modelWeights = require("../../assets/model/weights.bin");

  // Load the model from the models folder
  const loadModel = async () => {
    setStatusMessage("Loading model...");
    await tf.ready(); // Ensure TensorFlow is ready

    const model = await tf
      .loadLayersModel(bundleResourceIO(modelJSON, modelWeights))
      .catch((e) => console.log(e));
    console.log("Model loaded!");
    setStatusMessage("");
    setStatusMessage("Model Loaded!");
    return model;
  };

  // const predict = async (imageUri) => {
  //   setStatusMessage("Predicting...");

  //   await tf.ready(); // Ensure TensorFlow is ready

  //   const img = await Image.loadAsync(imageUri);
  //   const imgTensor = tf.browser.fromPixels(img);
  //   const offset = tf.scalar(127.5);
  //   const normalized = imgTensor.sub(offset).div(offset);
  //   const batched = normalized.expandDims(0);

  //   const logits = tf.tidy(() => model.predict(batched));
  //   showResult(logits);
  //   logits.dispose(); // Clean up memory
  // };

  // const showResult = async (logits) => {
  //   const messages = [
  //     "This banana looks a little green! Wait a little longer before eating it.",
  //     "This banana looks rotten or overripe. I would not eat it if I were you.",
  //     "Yum! Looks ripe to me!",
  //   ];

  //   const classIdx = (await logits.argMax(1).data())[0];
  //   setPredictionResult(messages[classIdx]);
  // };

  // const handleImageSelection = async () => {
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (!permissionResult.granted) {
  //     alert("Permission to access media library is required!");
  //     return;
  //   }

  //   const pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (!pickerResult.canceled) {
  //     const selectedAsset = pickerResult.assets[0]; // Access the first selected asset
  //     setSelectedImage(selectedAsset.uri);
  //     predict(selectedAsset.uri);
  //   }
  // };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button title="Select Image" onPress={handleImageSelection} /> */}

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        />
      )}

      <Text>Status: {statusMessage}</Text>
      <Text>Prediction: {predictionResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
  },
});

export default BananaDetector;
