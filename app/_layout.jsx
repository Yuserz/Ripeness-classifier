import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../providers/ThemeProvider";
import { useColorScheme } from "react-native";
import { SettingsProvider } from "../providers/SettingsProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();
  const [mode, setMode] = useState("system");
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && themeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, themeLoaded]);

  if (!loaded) {
    return <Slot />;
  }

  const getInvertedColor = () => {
    switch (mode) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      case "system":
        if (colorScheme === "light") return "dark";
        if (colorScheme === "dark") return "light";
    }
  };

  const onThemeLoad = () => {
    setThemeLoaded(true);
  }

  return (
    <SettingsProvider>
      <ThemeProvider value={{ mode, setMode, colorScheme, getInvertedColor, onThemeLoad }}>
        <Stack
          screenOptions={{ headerShown: false, animation: "none" }}
          initialRouteName="/splash"
        >
          <Stack.Screen
            name="splash"
            options={{
              headerShown: false,
              statusBarTranslucent: true,
              statusBarStyle: "light",
            }}
          />
          <Stack.Screen
            name="cameraView"
            options={{
              headerShown: false,
              statusBarTranslucent: true,
              statusBarStyle: "light",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              statusBarTranslucent: true,
              statusBarStyle: getInvertedColor(),
            }}
          />
        </Stack>
      </ThemeProvider>
    </SettingsProvider>
  );
}
