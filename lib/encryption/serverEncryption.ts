// server-crypto.js
import crypto from 'crypto';

// Key and IV should be stored securely and used consistently across client and server
const key = Buffer.from('12345678901234561234567890123456', 'utf-8'); // 32-byte key
const iv = Buffer.from('1234567890123456', 'utf-8'); // 16-byte IV

export function encryptServer(text: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decryptServer(encryptedText: string) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
