import { useTheme } from "../hooks/useTheme";
import { Text, StyleSheet } from "react-native";

export const Header = ({children}) => {
  const { theme } = useTheme();

  const style = StyleSheet.create({
    text: {
      color: theme.primary,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 40,
    },
  });

  return (
    <Text style={style.text}>
      {children}
    </Text>
  );
};
