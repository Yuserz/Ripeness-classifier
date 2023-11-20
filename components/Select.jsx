import { Picker } from "@react-native-picker/picker";
import { Text } from "./Text";
import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export const Select = ({ options, children }) => {
  const [selected, setSelected] = useState(null);
  return (
    // <Pressable style={styles.container}>
    //   <Text style={styles.text}>{children}</Text>
    <Picker
      selectedValue={selected}
      onValueChange={(value) => setSelected(value)}
    >
      {options.map((item) => {
        return (
          <Picker.Item key={item.name} label={item.name} value={item.value} />
        );
      })}
    </Picker>
    // </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
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
