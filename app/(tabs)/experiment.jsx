import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const IMAGE_SIZE = 224;

const BananaDetector = () => {
  const [model, setModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const loadModel = async () => {
    setStatusMessage("Loading model...");
    await tf.ready();

    const modelJSON = require("../../assets/model/model.json");
    const modelWeights = require("../../assets/model/weights.bin");

    const loadedModel = await tf.loadLayersModel(
      bundleResourceIO(modelJSON, modelWeights)
    );

    setModel(loadedModel);
    setStatusMessage("Model Loaded!");
  };

  const loadImageTensor = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();
      const imageArray = new Uint8Array(arrayBuffer);

      console.log("imageUri:", imageUri);
      console.log("Image array length:", imageArray.length);

      // if (imageArray.length !== IMAGE_SIZE * IMAGE_SIZE * 3) {
      //   console.error("Incorrect image data length");
      //   return null;
      // }

      const imageTensor = tf.tensor(
        imageArray,
        [IMAGE_SIZE, IMAGE_SIZE, 3],
        "int32"
      );

      return imageTensor;
    } catch (error) {
      console.error("Error loading image tensor:", error);
      return null;
    }
  };

  const processPredictions = (predictions) => {
    const maxIndex = predictions.argMax(1).dataSync()[0];
    const ripenessLabels = ["Green", "Ripe", "Overripe"];
    const predictedLabel = ripenessLabels[maxIndex];

    return predictedLabel;
  };

  const handleImageSelection = async () => {
    try {
      const imageUri = "https://i.imgur.com/p7YmjNR.jpg";

      handleImageResult(imageUri);
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleImageResult = async (result) => {
    // console.log("result:", result);
    if (result.canceled) {
      console.log("Image selection canceled");
      return;
    }

    const selectedUri = result;
    setSelectedImage(selectedUri);
    setStatusMessage("");
    setPredictionResult("");

    try {
      const resizedImage = await resizeImage(selectedUri);

      if (resizedImage) {
        // console.log("resizedImage:", resizedImage);
        predictBananaRipeness(resizedImage.uri);
      }
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  const resizeImage = async (uri) => {
    console.log("uri:", uri);
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: IMAGE_SIZE, height: IMAGE_SIZE } }],
        { format: ImageManipulator.SaveFormat.JPEG }
      );
      return resizedImage;
    } catch (error) {
      console.error("Error resizing image:", error);
      return null;
    }
  };

  const predictBananaRipeness = async (processedImage) => {
    setStatusMessage("Predicting...");

    console.log("processedImage:", processedImage);

    try {
      const imageTensor = await loadImageTensor(processedImage); // Use processedImage.uri
      const normalizedImageTensor = imageTensor.div(255.0);

      const predictions = model.predict(normalizedImageTensor);
      const ripenessLabel = processPredictions(predictions);

      setPredictionResult(ripenessLabel);
      setStatusMessage("Prediction Done!");
    } catch (error) {
      console.error("Error processing image:", error);
      setStatusMessage("Error processing image");
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={handleImageSelection} />

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
