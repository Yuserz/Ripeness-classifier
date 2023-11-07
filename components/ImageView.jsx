import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ImageView = ({ image }) => {
  return (
    <View style={style.container}>
      {image ? (
        <Image source={{ uri: image }} style={style.image} />
      ) : (
        <Ionicons name="image" size={150} color="rgba(158, 150, 150, .3)" />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(158, 150, 150, .5)",
    borderRadius: 8,
    marginBottom: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
