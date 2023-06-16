import AsyncStorage from '@react-native-async-storage/async-storage';

type Storage = {
  token: string;
  saleId: string;
};

export async function getStorage(key: keyof Storage) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function setStorage<T extends keyof Storage>(
  key: T,
  value: Storage[T],
) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
}
