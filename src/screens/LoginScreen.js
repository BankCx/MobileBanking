import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// Intentionally vulnerable - hardcoded credentials for demo
const DEMO_USER = 'user';
const DEMO_PASS = 'password123';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Intentionally vulnerable - no input validation, no rate limiting
  const handleLogin = async () => {
    if (username === DEMO_USER && password === DEMO_PASS) {
      // Intentionally vulnerable - storing credentials in plain text
      await AsyncStorage.setItem('user', username);
      await AsyncStorage.setItem('pass', password);
      navigation.navigate('AccountSummary');
    } else {
      // Intentionally vulnerable - weak error handling
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen; 