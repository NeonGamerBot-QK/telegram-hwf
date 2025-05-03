// encrypt-decrypt.ts
import env from "./env"
import * as crypto from 'crypto';

// Constants
const algorithm = 'aes-256-cbc';
const key = Buffer.from(env.ENC_KEY, 'base64') // 32-byte key
const iv = Buffer.from(env.ENC_IV, 'base64'); // 16-byte IV (needed for CBC)

// Encrypt function
export function encryptString(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return encrypted.toString('hex')
}

// Decrypt function
export function decryptString(encryptedHex: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedHex, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
  
