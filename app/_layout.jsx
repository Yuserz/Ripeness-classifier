import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

//components
import ThemeContext from "../context/ThemeContext";
import DefaultTheme from "../constants/Theme";
import { DarkTheme } from "../constants/DarkTheme";

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
  const [theme, setTheme] = useState(DefaultTheme);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  const onThemeChange = (theme) => {
    if (theme === "light") setTheme(DefaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      <Stack
        screenOptions={{
          statusBarHidden: false,
          statusBarColor: theme.primary,
          statusBarTranslucent: true,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}
