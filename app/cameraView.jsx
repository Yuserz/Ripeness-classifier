import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { saveToLibraryAsync, usePermissions } from "expo-media-library";
import { useSettings } from "../hooks/useSettings";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = usePermissions();
  const [ready, setIsReady] = useState(false);
  const [isCapture, setIsCapture] = useState(false);
  const ref = useRef(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { settings } = useSettings();

  const padding = StyleSheet.create({
    container: {
      paddingTop: top,
    },
  });

  const takePicture = async () => {
    try {
      if (!ready) return;
      setIsCapture(true);
      const snap = await ref.current.takePictureAsync({
        quality: 0.2,
        skipProcessing: true,
        base64: false,
      });

      if (settings.saveCaptured) {
        await saveToLibraryAsync(snap.uri);
      }

      navigation.navigate("camera", { image: snap.uri });
    } catch (e) {
      console.log(e);
    } finally {
      setIsCapture(false);
    }
  };

  if (!permission || !permissionMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) requestPermission();
  if (!permissionMedia.granted) requestPermissionMedia();

  return (
    <View style={[styles.container, padding.container]}>
      {isCapture && (
        <View style={styles.indicator}>
          <ActivityIndicator size={"small"} color={"white"} />
          <Text style={styles.text}>Capturing... Please hold still!</Text>
        </View>
      )}

      {isFocused && (
        <Camera
          style={styles.camera}
          type={CameraType.back}
          ratio="4:3"
          ref={ref}
          onCameraReady={() => {
            setIsReady(true);
          }}
        />
      )}

      <View style={styles.bottomContainer}>
        <Pressable style={styles.capture} onPress={takePicture}>
          <View style={styles.inner}></View>
        </Pressable>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");
const freeHeight = height - (width * 4) / 3;

const styles = StyleSheet.create({
  indicator: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "10%",
    zIndex: 10,
    columnGap: 10,
  },
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    height: freeHeight,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  capture: {
    width: 90,
    aspectRatio: 1 / 1,
    backgroundColor: "#fff",
    borderRadius: 9999,
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    backgroundColor: "#dedede",
  },
});
