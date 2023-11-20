import Checkbox from "expo-checkbox";
import { Text } from "./Text";
import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

export const CheckBox = ({ children, onChange, value }) => {
  const [checked, setChecked] = useState(value);
  const { theme } = useTheme();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setChecked((prev) => {
          onChange(!prev);
          return !prev;
        });
      }}
    >
      <Text style={styles.text}>{children}</Text>
      <Checkbox
        style={styles.checkbox}
        value={checked}
        onValueChange={setChecked}
        color={checked && theme.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
  },
});
