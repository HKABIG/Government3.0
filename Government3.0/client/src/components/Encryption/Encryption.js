import CryptoJS from 'crypto-js';
import config from '../../config';

// const text = 'QmWPB3wHDeTsZ3ua9p7gwMLiS7C1QGnvUT3B5yVhUzh5JD';
const password = config.CONTRACT_ADDRESS;
const salt = '0xf468001f64d85d214d139b94deee84943d6ca6ea0599507d4208d86d5a04a92a';
const iterations = 100000;
const keySize = 256 / 32; // Key size in words (256 bits)

// Derive the key using PBKDF2
const key = CryptoJS.PBKDF2(password, salt, {
  keySize: keySize,
  iterations: iterations,
  hasher: CryptoJS.algo.SHA256,
});

// Encrypt the text
// const encryptedText = CryptoJS.AES.encrypt(text, key.toString()).toString();

// Decrypt the text
// const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key.toString());
// const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

// console.log("Original Text:", text);
// console.log("Encrypted Text:", encryptedText);
// console.log("Decrypted Text:", decryptedText);

export default key;
