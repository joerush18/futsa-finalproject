import AsyncStorage from "@react-native-async-storage/async-storage";

class TokenService {
  setItem = (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  };

  getItem = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  };

  removeItem = (key: string) => {
    AsyncStorage.removeItem(key);
  };
}

export default new TokenService();
