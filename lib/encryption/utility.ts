import * as jose from 'jose';
import { FirestoreUserData } from '@/lib/types/user';

// Symmetric encryption using AES-GCM (can be used on both client and server)
export async function encryptData(data: FirestoreUserData | any) {
    const secretKey = process.env.ENCRYPTION_SECRET_KEY;
    const encodedSecretKey = new TextEncoder().encode(secretKey); // Convert string key to Uint8Array

    const encryptedData = await new jose.EncryptJWT({ data })
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }) // AES-GCM encryption
        .setIssuedAt()
        .setExpirationTime('2h')
        .encrypt(encodedSecretKey);

    return encryptedData; // Return the encrypted JWT token
}

export async function decryptData(encryptedData: FirestoreUserData | any) {
  const secretKey = process.env.ENCRYPTION_SECRET_KEY;
  const encodedSecretKey = new TextEncoder().encode(secretKey); // Same key for decryption

  try {
    const { payload } = await jose.jwtDecrypt(encryptedData, encodedSecretKey);
    return payload.data; // Return the decrypted data
  } catch (err) {
    console.error('Decryption failed:', err);
    return null;
  }
}

// Asymmetric encryption example (RSA) (can be used on both client and server)
// export async function encryptWithRSA(data: string, publicKey: string) {
//   const encryptedData = await new jose.EncryptJWT({ data })
//     .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' }) // RSA encryption with AES-GCM
//     .encrypt(publicKey);

//   return encryptedData; // Return the encrypted data
// }

// export async function decryptWithRSA(encryptedData: string, privateKey: string) {
//   try {
//     const { payload } = await jose.jwtDecrypt(encryptedData, privateKey);
//     return payload.data; // Return the decrypted data
//   } catch (err) {
//     console.error('Decryption failed:', err);
//     return null;
//   }
// }
