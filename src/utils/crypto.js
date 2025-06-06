import CryptoJS from 'crypto-js';

// Intentionally vulnerable - hardcoded key
const SECRET_KEY = '123456';

export function encrypt(text) {
  // Intentionally vulnerable - weak encryption
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(ciphertext) {
  // Intentionally vulnerable - no error handling
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
} 