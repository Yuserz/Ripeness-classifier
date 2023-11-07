import { Tabs } from "expo-router/tabs";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

export default () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.primary, height: 64 },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.background,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          href: "/camera",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="output"
        options={{
          href: "/output",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="text-document-inverted" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="splash"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
};
