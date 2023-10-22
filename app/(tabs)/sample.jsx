import { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useModel } from "hooks/useModel";
import * as ImagePicker from "expo-image-picker";
import imgAlt from "assets/icons/img-preview.png";
import { colors } from "constants/Colors";

const SampleComponent = () => {
  const model = require("assets/model/model.json");
  const weights = require("assets/model/weights.bin");
  const labels = ["Unripe", "Ripe", "Overripe"];
  const [loading, setLoading] = useState(false);

  const { isLoaded, convertToTensor, predict } = useModel({
    model,
    weights,
    labels,
  });

  const [{ prediction, accuracy }, setResult] = useState("");
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
      setLoading(true);
      const imageTensor = await convertToTensor(imageUri);
      const { accuracy, prediction } = await predict(imageTensor);
      console.log({ accuracy, prediction });
      setResult({ prediction, accuracy });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {selectedImage ? (
        <View style={styles.imgContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImg} />
        </View>
      ) : (
        <View style={styles.imgContainer}>
          <Image source={imgAlt} style={styles.altImg} />
        </View>
      )}
      <Button title="Upload Image" onPress={handleImageSelection} />

      <Text>Status: {isLoaded ? "Model loaded!" : "Loading model..."}</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && !loading && (
        <Text>Prediction: {prediction.toUpperCase()}</Text>
      )}
    </View>
  );
};

export default SampleComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    gap: 20,
  },
  imgContainer: {
    width: "95%",
    minHeight: 300,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: colors.primary[0],
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImg: {
    width: "100%",
    height: 300,
  },
  altImg: {
    width: 170,
    height: 150,
    objectFit: "cover",
    opacity: 0.2,
  },
});
