import { useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useModel } from "../../hooks/useModel";
import * as ImagePicker from "expo-image-picker";

const BananaDetector = () => {
  const model = require("../../assets/model/model.json");
  const weights = require("../../assets/model/weights.bin");
  const labels = ["Unripe", "Ripe", "Overripe"];

  const { isLoaded, convertToTensor, predict } = useModel({
    model,
    weights,
    labels,
  });

  const [{prediction, accuracy}, setResult] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      startPrediction(result.assets[0].uri);
    }
  };

  const startPrediction = async (imageUri) => {
    try {
      const imageTensor = await convertToTensor(imageUri);
      const { accuracy, prediction } = await predict(imageTensor);
      console.log({accuracy, prediction});
      setResult({prediction, accuracy})
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={handleImageSelection} />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 224, height: 224 }}
        />
      )}

      <Text>
        Status: {isLoaded ? "Model loaded!" : "Model is being loaded..."}
      </Text>
      <Text>Prediction: {prediction}</Text>
      <Text>Accuracy: {accuracy}%</Text>
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
