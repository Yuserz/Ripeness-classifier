import {
  Layout,
  Header,
  ImageView,
  Text,
  Percent,
  Listen,
  SubButton,
} from "../../components";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { predictionList } from "../../constants/predictions";
import { useNavigation } from "expo-router";

export default function Result() {
  const route = useRoute();
  const navigation = useNavigation();
  const { accuracy, prediction, image } = route.params || {};
  
  return (
    <Layout>
      <Header>RESULT</Header>
      <ImageView image={image} />
      <Listen />
      <Text style={style.description}>
        {predictionList.find((pred) => pred.id === prediction)?.description}
      </Text>
      <View style={style.bottomContainer}>
        <Text style={style.subheader}>Accuracy</Text>
        <Percent percent={accuracy?.toFixed(0) || 0} />
        <SubButton
          onPress={() => {
            navigation.navigate("camera", {});
          }}
        >
          Scan Again
        </SubButton>
      </View>
    </Layout>
  );
}

const style = StyleSheet.create({
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -10,
  },
  bottomContainer: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    height: 200,
    bottom: 0,
  },
});
