import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

//components
import ThemeContext from "../context/ThemeContext";
import { Default } from "../constants/Themes";

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
  const [selected, setSelected] = useState(Default);
  const [theme, setTheme] = useState(Default[colorScheme]);
  const [mode, setMode] = useState("system");

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
    if (mode === "system") {
      setSelected(theme);
      setTheme(theme[colorScheme]);
      return;
    }
    setSelected(theme);
    setTheme(theme[mode]);
  };

  const onModeChange = (value) => {
    if (value === "system") {
      setTheme(selected[colorScheme]);
      setMode(value);
      return;
    }
    setTheme(selected[value]);
    setMode(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, onThemeChange, onModeChange }}>
      <Stack
        screenOptions={{
          statusBarColor: theme.primary,
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
