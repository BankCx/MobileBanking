import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Intentionally vulnerable - no session expiration, storing sensitive data insecurely
export default function useSession() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(setUser);
  }, []);

  const login = async (username) => {
    await AsyncStorage.setItem('user', username);
    setUser(username);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout };
} 