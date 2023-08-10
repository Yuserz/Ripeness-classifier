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
    const response = imageUri;
    const imageData = await response.arrayBuffer();
    const imageArray = new Uint8Array(imageData);

    console.log("response:", response);

    console.log("Image array length:", imageArray.length); // Debugging

    // Ensure that the imageArray has the correct length
    if (imageArray.length !== IMAGE_SIZE * IMAGE_SIZE * 3) {
      console.error("Incorrect image data length");
      return null; // Return null if the length is incorrect
    }

    const imageTensor = tf.tensor(
      imageArray,
      [IMAGE_SIZE, IMAGE_SIZE, 3],
      "float32"
    );

    return imageTensor;
  };

  const processPredictions = (predictions) => {
    const maxIndex = predictions.argMax(1).dataSync()[0];
    const ripenessLabels = ["Green", "Ripe", "Overripe"];
    const predictedLabel = ripenessLabels[maxIndex];

    return predictedLabel;
  };

  // const handleImageSelection = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setSelectedImage(result.assets[0].uri);

  //       console.log(result.assets[0]);
  //       setStatusMessage("");
  //       setPredictionResult("");

  //       // predictBananaRipeness(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.error("Error selecting image:", error);
  //   }
  // };

  // const predictBananaRipeness = async (imageUri) => {
  //   setStatusMessage("Predicting...");

  //   try {
  //     const processedImage = await ImageManipulator.manipulateAsync(
  //       imageUri,
  //       [{ resize: { width: IMAGE_SIZE, height: IMAGE_SIZE } }],
  //       { format: ImageManipulator.SaveFormat.PNG } // Specify the save format
  //     );

  //     const imageTensor = await loadImageTensor(processedImage.assets[0].uri);
  //     const normalizedImageTensor = imageTensor.div(255.0);

  //     const predictions = model.predict(normalizedImageTensor);
  //     const ripenessLabel = processPredictions(predictions);

  //     setPredictionResult(ripenessLabel);
  //     setStatusMessage("Prediction Done!");
  //   } catch (error) {
  //     console.error("Error processing image:", error);
  //     setStatusMessage("Error processing image");
  //   }
  // };

  const handleImageSelection = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;

        setSelectedImage(selectedUri);
        setStatusMessage("");
        setPredictionResult("");

        const resizedImage = await ImageManipulator.manipulateAsync(
          selectedUri,
          [{ resize: { width: IMAGE_SIZE, height: IMAGE_SIZE } }],
          { format: ImageManipulator.SaveFormat.PNG }
        );

        console.log("resizedImage:", resizedImage);

        if (resizedImage) {
          predictBananaRipeness(resizedImage.assets[0].uri);
        }
      } else {
        console.log("No image selected");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const predictBananaRipeness = async (processedImage) => {
    setStatusMessage("Predicting...");

    console.log("processedImage:", processedImage);

    // try {
    const imageTensor = loadImageTensor(processedImage); // Use processedImage.uri
    const normalizedImageTensor = imageTensor.div(255.0);

    const predictions = model.predict(normalizedImageTensor);
    const ripenessLabel = processPredictions(predictions);

    setPredictionResult(ripenessLabel);
    setStatusMessage("Prediction Done!");
    // // } catch (error) {
    //   console.error("Error processing image:", error);
    //   setStatusMessage("Error processing image");
    // }
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
