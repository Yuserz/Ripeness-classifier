import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useModel } from "../../hooks/useModel";
import * as ImagePicker from "expo-image-picker";
import { Layout, Button, Header, ImageView } from "../../components";

const model = require("../../assets/model/model.json");
const weights = require("../../assets/model/weights.bin");
const labels = ["Unripe", "Ripe", "Overripe"];

const BananaDetector = () => {
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
      const imageTensor = await convertToTensor(imageUri);
      const { accuracy, prediction } = await predict(imageTensor);
      console.log({ accuracy, prediction });
      setResult({ prediction, accuracy });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Header>UPLOAD SCREEN</Header>
      <ImageView image={selectedImage} />
      <Text style={style.text}>
        Start classifying bananas' ripeness{" "}
        <Text style={style.text2}>by pressing the buttons below.</Text>
      </Text>
      <View style={style.buttonContainer}>
        <Button onPress={handleImageSelection}>Capture</Button>
        <Button onPress={handleImageSelection} style={style.button}>
          Upload
        </Button>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
    rowGap: 12,
  },
  button: {
    width: 175,
    opacity: 0.9,
  },
});

export default BananaDetector;
