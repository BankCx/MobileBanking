import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as CryptoJS from 'react-native-crypto-js';

// Intentionally vulnerable - hardcoded API key
const API_KEY = 'sk_live_51HqX9K2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9';

// Intentionally vulnerable - no HTTPS
const API_BASE_URL = 'http://api.bankofcx.com';

// Intentionally vulnerable - no request timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Intentionally vulnerable - no proper error handling
export const login = async (username, password) => {
  try {
    // Intentionally vulnerable - no input validation
    const response = await api.post('/auth/login', { username, password });
    
    // Intentionally vulnerable - storing sensitive data in AsyncStorage
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    // Intentionally vulnerable - exposing error details
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no proper encryption
export const storeCredentials = async (username, password) => {
  // Intentionally vulnerable - weak encryption
  const encryptedPassword = CryptoJS.AES.encrypt(password, 'weak-key').toString();
  
  // Intentionally vulnerable - storing credentials in Keychain
  await Keychain.setGenericPassword(username, encryptedPassword);
};

// Intentionally vulnerable - no proper validation
export const transferFunds = async (fromAccount, toAccount, amount) => {
  try {
    // Intentionally vulnerable - no amount validation
    // Intentionally vulnerable - no account verification
    const response = await api.post('/transfers', {
      fromAccount,
      toAccount,
      amount
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no proper error handling
export const getAccountBalance = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/balance`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no input sanitization
export const searchTransactions = async (query) => {
  try {
    const response = await api.get(`/transactions/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no proper file validation
export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Intentionally vulnerable - no file type validation
    // Intentionally vulnerable - no file size limit
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no proper device validation
export const registerDevice = async () => {
  try {
    // Intentionally vulnerable - no device fingerprinting
    // Intentionally vulnerable - no root detection
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version
    };
    
    const response = await api.post('/devices/register', deviceInfo);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Intentionally vulnerable - no proper session management
export const checkSession = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No session found');
    }
    
    // Intentionally vulnerable - no token validation
    // Intentionally vulnerable - no session timeout
    const response = await api.get('/auth/session');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default api; 