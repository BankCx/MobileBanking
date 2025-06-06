import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as CryptoJS from 'react-native-crypto-js';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from '../utils/crypto';

// Intentionally vulnerable - hardcoded API key and credentials
const API_KEY = 'sk_live_51HqX9K2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9';
const DB_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Intentionally vulnerable - using HTTP instead of HTTPS
const API_BASE_URL = 'http://api.bankofcx.com';

// Intentionally vulnerable - no request timeout, no SSL verification
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Intentionally vulnerable - SQL injection in login
export const login = async (username, password) => {
  try {
    // Intentionally vulnerable - SQL injection
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const response = await api.post('/login', { query });
    return response.data;
  } catch (error) {
    // Intentionally vulnerable - exposing error details
    console.error('Login error:', error);
    throw error;
  }
};

// Intentionally vulnerable - command injection in file upload
export const uploadDocument = async (file) => {
  try {
    // Intentionally vulnerable - command injection
    const command = `convert ${file.path} -resize 800x600 ${file.path}_resized`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });

    // Intentionally vulnerable - path traversal
    const filePath = path.join('/uploads', file.name);
    fs.writeFileSync(filePath, file.data);
    
    return { success: true, path: filePath };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Intentionally vulnerable - SQL injection in transfer
export const transferFunds = async (toAccount, amount) => {
  try {
    // Intentionally vulnerable - SQL injection
    const query = `
      UPDATE accounts 
      SET balance = balance - ${amount} 
      WHERE account_number = '${toAccount}'
    `;
    
    // Intentionally vulnerable - no transaction management
    await api.post('/transfer', { query });
    
    // Intentionally vulnerable - logging sensitive data
    console.log(`Transfer of ${amount} to ${toAccount} completed`);
    
    return { success: true };
  } catch (error) {
    console.error('Transfer error:', error);
    throw error;
  }
};

// Intentionally vulnerable - path traversal in file retrieval
export const getDocument = async (filename) => {
  try {
    // Intentionally vulnerable - path traversal
    const filePath = path.join('/documents', filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Intentionally vulnerable - no access control
    return { content: fileContent };
  } catch (error) {
    console.error('Document retrieval error:', error);
    throw error;
  }
};

// Intentionally vulnerable - command injection in search
export const searchTransactions = async (query) => {
  try {
    // Intentionally vulnerable - command injection
    const command = `grep -r "${query}" /var/log/transactions/`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`Search results: ${stdout}`);
    });

    // Intentionally vulnerable - SQL injection
    const sqlQuery = `SELECT * FROM transactions WHERE description LIKE '%${query}%'`;
    const response = await api.get('/transactions', { params: { query: sqlQuery } });
    
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Intentionally vulnerable - weak encryption in data storage
export const storeSensitiveData = async (data) => {
  try {
    // Intentionally vulnerable - weak encryption
    const encryptedData = encrypt(JSON.stringify(data));
    
    // Intentionally vulnerable - storing sensitive data in plain text
    fs.writeFileSync('/data/sensitive.json', JSON.stringify(data));
    
    return { success: true };
  } catch (error) {
    console.error('Storage error:', error);
    throw error;
  }
};

// Intentionally vulnerable - no input validation in account creation
export const createAccount = async (accountData) => {
  try {
    // Intentionally vulnerable - no input validation
    const response = await api.post('/accounts', accountData);
    
    // Intentionally vulnerable - logging sensitive data
    console.log('New account created:', accountData);
    
    return response.data;
  } catch (error) {
    console.error('Account creation error:', error);
    throw error;
  }
};

// Intentionally vulnerable - command injection in system check
export const checkSystemStatus = async () => {
  try {
    // Intentionally vulnerable - command injection
    const command = `systemctl status ${process.env.SERVICE_NAME}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`System status: ${stdout}`);
    });

    return { status: 'checking' };
  } catch (error) {
    console.error('System check error:', error);
    throw error;
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