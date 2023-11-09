import { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../hooks/useTheme";

const LoadingAnimation = ({ isPlaying, onFinish }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primary,
    },
    text: {
      position: "absolute",
      bottom: 250,
      color: theme.background,
      fontSize: 24,
    },
  });

  useEffect(() => {
    if (isPlaying) {
      setIsLoading(true);
    }
  }, [isPlaying]);

  return (
    <Modal visible={isLoading} animationType="none">
      <View style={styles.loadingContainer}>
        <LottieView
          autoPlay
          speed={1}
          source={require("../assets/animations/loading.json")}
          resizeMode="cover"
          style={{
            width: 250,
            height: 250,
          }}
          loop={isPlaying}
          onAnimationFinish={() => {
            onFinish();
            setIsLoading(false);
          }}
          colorFilters={[{ keypath: "Balls", color: theme.background }]}
        />
        <Text style={styles.text}>PROCESSING IMAGE</Text>
      </View>
    </Modal>
  );
};

export default LoadingAnimation;
