// client-crypto.js
import CryptoJS from 'crypto-js';

// Key and IV should be stored securely and used consistently across client and server
const key = CryptoJS.enc.Utf8.parse('12345678901234561234567890123456'); // 32-byte key
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV

export function encryptClient(text: string) {
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return encrypted.toString();
}

export function decryptClient(encryptedText: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
  return bytes.toString(CryptoJS.enc.Utf8);
}
