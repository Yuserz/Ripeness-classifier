import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

const LoadingAnimation = ({ isVisible }) => (
  <Modal transparent={false} visible={isVisible}>
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingAnimation;
