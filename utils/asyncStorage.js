import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
  const value = await AsyncStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

export const setItem = async (key, object) => {
  const json = JSON.stringify(object);
  await AsyncStorage.setItem(key, json);
};

export const removeItem = async (key) => {
  await AsyncStorage.removeItem(key);
};
