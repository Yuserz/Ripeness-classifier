import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export const ImageView = ({ image }) => {
  const { theme } = useTheme();

  const themeStyle = StyleSheet.create({
    background: { backgroundColor: theme.secondary },
  });

  return (
    <View style={[style.container, themeStyle.background]}>
      {image ? (
        <Image source={{ uri: image }} style={style.image} />
      ) : (
        <Ionicons name="image" size={170} color="rgba(158, 150, 150, .3)" />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 3,
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
