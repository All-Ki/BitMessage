import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  static async encryptData(data: string, publicKey: CryptoKey) {
    const encoder = new TextEncoder();
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encoder.encode(data)
    );

    return encryptedData;
  }
  static async decryptData(encryptedData: ArrayBuffer, privateKey: CryptoKey) {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  }
  public static async encryptDataSymmetric(data: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const keyData = new TextEncoder().encode(key);
    const cryptoKey = await crypto.subtle.importKey(
      'raw', // Import the key in binary format
      keyData,
      'AES-CBC',
      false, // The imported key can't be extracted
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(16)); // Initialization vector
    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, encodedData);

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData))); // Convert ArrayBuffer to Base64

    return encryptedBase64;
  }

  public static async decryptDataSymmetric(encryptedData: string, key: string): Promise<string> {
    const keyData = new TextEncoder().encode(key);
    const cryptoKey = await crypto.subtle.importKey(
      'raw', // Import the key in binary format
      keyData,
      'AES-CBC',
      false, // The imported key can't be extracted
      ['decrypt']
    );

    const iv = new Uint8Array(16); // Use the same initialization vector used during encryption
    const encryptedArrayBuffer = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0))); // Convert Base64 to ArrayBuffer
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, encryptedArrayBuffer);

    const decoder = new TextDecoder();
    const decryptedText = decoder.decode(decryptedData);

    return decryptedText;
  }
}
