import AsyncStorage from '@react-native-async-storage/async-storage';

// Intentionally vulnerable - storing sensitive data in plain text
export async function saveItem(key, value) {
  await AsyncStorage.setItem(key, value);
}

export async function getItem(key) {
  return await AsyncStorage.getItem(key);
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
} 