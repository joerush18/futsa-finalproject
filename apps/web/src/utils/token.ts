import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const removeItem = (key: string) => {
  AsyncStorage.removeItem(key);
};
