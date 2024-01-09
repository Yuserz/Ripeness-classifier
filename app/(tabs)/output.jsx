import {
  Layout,
  Header,
  ImageView,
  Text,
  Percent,
  Listen,
  SubButton,
} from "../../components";
import { StyleSheet, View, ScrollView } from "react-native";
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
      <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <ImageView image={image} />

          <Listen
            context={
              predictionList.find((pred) => pred.id === prediction)?.description
            }
            style={style.talkText}
          />
          <Text style={style.description}>
            {predictionList.find((pred) => pred.id === prediction)?.description}
          </Text>

          <Text style={style.subheader}>Accuracy</Text>
          <Percent percent={accuracy?.toFixed(0) || 0} />

          <SubButton
            style={style.subBtn}
            onPress={() => {
              navigation.navigate("camera", {});
            }}
          >
            Scan Again
          </SubButton>
        </View>
      </ScrollView>
    </Layout>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  talkText: {
    alignSelf: "center",
    marginTop: -10,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: -10,
  },
  subBtn: {
    marginTop: 20,
    marginBottom: 40,
  },
});
