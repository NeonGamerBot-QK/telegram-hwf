import * as crypto from 'crypto';
import env from '../src/env'
// Constants
const algorithm = 'aes-256-cbc';
const key = Buffer.from(crypto.createHash('sha256').update(env.ENCRYPTION_KEY).digest()).toString('base64'); // 32-byte key
const iv = Buffer.from(crypto.randomBytes(16)).toString('base64'); // 16-byte IV (needed for CBC)

console.log(`KEY: `, key)
console.log(`IV: `, iv)
