import * as jose from 'jose';
import { FirestoreUserData } from '@/lib/types/user';

// Store the key for reuse
let secretKey: CryptoKey | null = null;

// Initialize or get the encryption key
async function getSecretKey() {
    if (secretKey) return secretKey;

    // Use environment variable or generate a new key
    const keyBytes = new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY);
    

    secretKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    return secretKey;
}

// Symmetric encryption using AES-GCM (can be used on both client and server)
export async function encryptData(data: any) {
    const key = await getSecretKey();

    const encryptedData = await new jose.EncryptJWT({ data })
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .encrypt(key);

    return encryptedData;
}

export async function decryptData(encryptedData: string) {
    try {
        const key = await getSecretKey();
        const { payload } = await jose.jwtDecrypt(encryptedData, key);
        return payload.data;
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
