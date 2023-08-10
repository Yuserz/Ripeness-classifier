import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

const MODEL_PATH = "model_js/model.json";
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

  const loadModel = async () => {
    setStatusMessage("Loading model...");
    const loadedModel = await tf.loadLayersModel(MODEL_PATH);
    setModel(loadedModel);
    await loadedModel.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3]));
    setStatusMessage("");

    if (selectedImage) {
      predict(selectedImage);
    }
  };

  const predict = async (image) => {
    setPredictionResult("");

    setStatusMessage("Predicting...");
    const startTime = performance.now();
    const logits = tf.tidy(() => {
      const img = tf.browser.fromPixels(image).toFloat();
      const offset = tf.scalar(127.5);
      const normalized = img.sub(offset).div(offset);
      const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
      return model.predict(batched);
    });

    showResult(logits);

    const totalTime = performance.now() - startTime;
    setStatusMessage(`Done in ${Math.floor(totalTime)}ms.`);
  };

  const showResult = async (logits) => {
    const message = {
      0: "This banana looks a little green! Wait a little longer before eating it.",
      1: "This banana looks rotten or overripe. I would not eat it if I were you.",
      2: "Yum! Looks ripe to me!",
    };

    const values = await logits.data();
    const classIdx = (await logits.argMax(1).data())[0];
    setPredictionResult(message[classIdx]);
  };

  const handleImageSelection = async (evt) => {
    const files = evt.target.files;

    for (let i = 0; i < files.length; ++i) {
      const f = files[i];
      if (!f.type.match("image.*")) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setSelectedImage(imageDataURL);
        predict(imageDataURL);
      };

      reader.readAsDataURL(f);
      break;
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <View>
      <input type="file" accept="image/*" onChange={handleImageSelection} />

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

export default BananaDetector;
