import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useModel } from "../../hooks/useModel";
import * as ImagePicker from "expo-image-picker";
import {
  Layout,
  Button,
  Header,
  ImageView,
  Text,
  SubButton,
  LoadingAnimation,
} from "../../components";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router/src/useNavigation";

const model = require("../../assets/model/model.json");
const weights = require("../../assets/model/weights.bin");
const labels = ["unripe", "ripe", "overripe"];

const BananaDetector = () => {
  const navigation = useNavigation();

  const { convertToTensor, predict } = useModel({
    model,
    weights,
    labels,
  });

  const [{ prediction, accuracy }, setResult] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setTimeout(() => {
        startPrediction(result.assets[0].uri);
      }, 300);
    }
  };

  const startPrediction = async (imageUri) => {
    try {
      setIsProcessing(true);
      setIsLoading(true);
      const imageTensor = await convertToTensor(imageUri);
      const { accuracy, prediction } = await predict(imageTensor);
      if (!accuracy || !prediction) throw new Error("No prediction");
      setResult({ prediction, accuracy });
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const onLoadingFinish = () => {
    setIsLoading(false);
    navigation.navigate("output", {
      image: selectedImage,
      prediction,
      accuracy,
    });
  };

  return (
    <Layout>
      <LoadingAnimation
        isLoading={isLoading}
        isPlaying={isProcessing}
        onFinish={onLoadingFinish}
      />
      <Header>UPLOAD SCREEN</Header>
      <ImageView image={selectedImage} />
      <Text style={style.text}>
        Capture or upload an image of banana to start.
      </Text>
      <View style={style.bottonContainer}>
        <Button onPress={handleImageSelection} icon={<Entypo name="camera" />}>
          Capture
        </Button>
        <SubButton onPress={handleImageSelection}>Upload Image</SubButton>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  bottonContainer: {
    display: "flex",
    alignItems: "center",
    rowGap: 5,
    position: "absolute",
    height: 200,
    bottom: 0,
  },
  button: {
    width: 175,
    opacity: 0.9,
  },
});

export default BananaDetector;
