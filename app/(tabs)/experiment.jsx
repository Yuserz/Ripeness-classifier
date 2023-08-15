import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as jpeg from "jpeg-js";

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
      const imageArray = await fetch(imageUri)
        .then((response) => response.arrayBuffer())
        .then((buffer) => new Uint8Array(buffer));

      console.log("imageArray:", imageArray.length);

      const jpegData = jpeg.decode(imageArray, true); // 'true' for JPEG with alpha (transparency)
      const rgbImageArray = new Uint8Array(
        jpegData.width * jpegData.height * 3
      );

      // console.log("Decoded jpegData:", jpegData);

      for (let i = 0; i < jpegData.data.length; i += 4) {
        rgbImageArray[(i / 4) * 3] = jpegData.data[i]; // Red channel
        rgbImageArray[(i / 4) * 3 + 1] = jpegData.data[i + 1]; // Green channel
        rgbImageArray[(i / 4) * 3 + 2] = jpegData.data[i + 2]; // Blue channel
      }

      // console.log("rgbImageArray:", rgbImageArray.length);

      // Create a TypedArray or flat array from rgbImageArray
      const flattenedArray = Array.from(rgbImageArray);
      // console.log(flattenedArray);

      const imageTensor = tf.tensor(
        flattenedArray,
        [1, IMAGE_SIZE, IMAGE_SIZE, 3],
        "float32"
      );
      console.log("rgbImageArray:", rgbImageArray.length);

      return imageTensor;
    } catch (error) {
      console.error("Error loading image tensor:", error);
      return null;
    }
  };

  // const processPredictions = (predictions) => {
  //   const maxIndex = predictions.argMax(1).dataSync()[0];
  //   const ripenessLabels = ["Unripe", "Ripe", "Overripe"];
  //   const predictedLabel = ripenessLabels[maxIndex];

  //   return predictedLabel;
  // };

  const processPredictions = (predictions) => {
    const maxIndexTensor = tf.argMax(predictions, 1);
    const maxIndex = maxIndexTensor.dataSync()[0];
    maxIndexTensor.dispose(); // Clean up the tensor

    const ripenessLabels = ["Unripe", "Ripe", "Overripe"];
    const predictedLabel = ripenessLabels[maxIndex];

    return predictedLabel;
  };

  const handleImageSelection = async () => {
    try {
      const imageUri = "https://i.imgur.com/p7YmjNR.jpg";
      // const imageUri = "https://i.imgur.com/pcGf3Qf.png";

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
      // const resizedImage = await resizeImage(selectedUri);
      const resizedImage = await resizeImage(selectedUri);

      if (resizedImage) {
        // console.log("resizedImage:", resizedImage.uri);
        predictBananaRipeness(resizedImage.uri);
      }
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  const resizeImage = async (uri) => {
    // console.log("uri:", uri);
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

    // console.log("processedImage:", processedImage);

    try {
      const imageTensor = await loadImageTensor(processedImage); // Use processedImage.uri
      // console.log("ImageTensor:", imageTensor.arraySync());

      const normalizedImageTensor = tf.div(imageTensor, 255.0);
      // console.log("normalizedImageTensor:", normalizedImageTensor.arraySync());
      // const normalizedImageArray = normalizedImageTensor.arraySync();

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
