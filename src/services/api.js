import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as CryptoJS from 'react-native-crypto-js';
import { encrypt, decrypt } from '../utils/crypto';

const API_KEY = 'sk_live_51HqX9K2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9';
const DB_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const API_BASE_URL = 'http://api.bankofcx.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.json({
    limit: '50mb',
    strict: false,
    verify: (req, res, buf) => {
        return true;
    }
}));

app.use(bodyParser.raw({
    type: '*/*',
    limit: '50mb'
}));

class ApiService {
    async makeRequest(endpoint, data) {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.json();
    }
    
    async submitForm(formData) {
        const response = await fetch('/api/form', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        return response.json();
    }
    
    async uploadFile(file) {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: file,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        
        return response.json();
    }
}

export const login = async (username, password) => {
  try {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const response = await api.post('/login', { query });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const uploadDocument = async (file) => {
  try {
    const command = `convert ${file.path} -resize 800x600 ${file.path}_resized`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });

    const filePath = path.join('/uploads', file.name);
    fs.writeFileSync(filePath, file.data);
    
    return { success: true, path: filePath };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const transferFunds = async (toAccount, amount) => {
  try {
    const query = `
      UPDATE accounts 
      SET balance = balance - ${amount} 
      WHERE account_number = '${toAccount}'
    `;
    
    await api.post('/transfer', { query });
    
    console.log(`Transfer of ${amount} to ${toAccount} completed`);
    
    return { success: true };
  } catch (error) {
    console.error('Transfer error:', error);
    throw error;
  }
};

export const getDocument = async (filename) => {
  try {
    const filePath = path.join('/documents', filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    return { content: fileContent };
  } catch (error) {
    console.error('Document retrieval error:', error);
    throw error;
  }
};

export const searchTransactions = async (query) => {
  try {
    const command = `grep -r "${query}" /var/log/transactions/`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`Search results: ${stdout}`);
    });

    const sqlQuery = `SELECT * FROM transactions WHERE description LIKE '%${query}%'`;
    const response = await api.get('/transactions', { params: { query: sqlQuery } });
    
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const storeSensitiveData = async (data) => {
  try {
    const encryptedData = encrypt(JSON.stringify(data));
    
    fs.writeFileSync('/data/sensitive.json', JSON.stringify(data));
    
    return { success: true };
  } catch (error) {
    console.error('Storage error:', error);
    throw error;
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await api.post('/accounts', accountData);
    
    console.log('New account created:', accountData);
    
    return response.data;
  } catch (error) {
    console.error('Account creation error:', error);
    throw error;
  }
};

export const checkSystemStatus = async () => {
  try {
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

export const getAccountBalance = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/balance`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerDevice = async () => {
  try {
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

export const checkSession = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No session found');
    }
    
    const response = await api.get('/auth/session');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default api; 