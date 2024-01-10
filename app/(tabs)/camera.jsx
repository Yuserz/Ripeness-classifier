import { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
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
import { useNavigation, router } from "expo-router";
import { useRoute } from "@react-navigation/native";

const model = require("../../assets/model/model.json");
const weights = require("../../assets/model/weights.bin");
const labels = ["unripe", "ripe", "overripe"];

const BananaDetector = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { convertToTensor, predict } = useModel({
    model,
    weights,
    labels,
  });

  const [{ prediction, accuracy }, setResult] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!route.params?.image) return;

    setSelectedImage(route.params?.image);
    startPrediction(route.params?.image);
  }, [route.params?.image]);

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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ImageView image={selectedImage} />
        <Text style={styles.text}>
          Capture or upload an image of banana to start.
        </Text>

        <Button
          style={styles.captureBtn}
          onPress={() => {
            router.push("cameraView");
          }}
          icon={<Entypo name="camera" />}
        >
          Capture
        </Button>
        <SubButton style={styles.subBtn} onPress={handleImageSelection}>
          Upload Image
        </SubButton>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  captureBtn: {
    marginTop: 10,
    alignSelf: "center",
  },
  subBtn: {
    alignSelf: "center",
  },
});

export default BananaDetector;
