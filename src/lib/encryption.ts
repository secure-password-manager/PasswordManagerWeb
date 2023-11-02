const encoder : TextEncoder  = new TextEncoder();
const decoder : TextDecoder = new TextDecoder();
const ITERATIONS : number = 600000;

export const deriveMasterKey = async (email : string, masterPassword : string) : Promise<ArrayBuffer> => {
    const salt : Uint8Array = encoder.encode(email);
    const payload : Uint8Array = encoder.encode(masterPassword);

    return await pbkdf2Hash(salt, payload);
}

export const deriveMasterPasswordHash = async (masterPassword : string, masterKey : ArrayBuffer) : Promise<string> => {
    const salt : Uint8Array = encoder.encode(masterPassword);

    const hashArray = await pbkdf2Hash(salt, masterKey);
    return arrayBufferToBase64(hashArray);
}

export const encryptSymmetricKey = async (symmetricKey : ArrayBuffer, masterKey : ArrayBuffer) : Promise<string> => {
    const iv : ArrayBuffer = generateIV();
    const encryptedSymmetricKey : ArrayBuffer = await aesEncrypt(symmetricKey, iv, masterKey);
    return serializeEncryptedItem(encryptedSymmetricKey, iv);
}

export const encryptVaultItem = async (vaultItem : string, symmetricKey : ArrayBuffer) : Promise<string> => {
    const iv : ArrayBuffer = generateIV();
    const vaultItemArray : Uint8Array = encoder.encode(vaultItem);
    const encryptedVaultItem : ArrayBuffer = await aesEncrypt(vaultItemArray, iv, symmetricKey)
    return serializeEncryptedItem(encryptedVaultItem, iv);
}

export const decryptSymmetricKey = async (encryptedSymmetricKeyB64 : string, masterKey : ArrayBuffer) : Promise<ArrayBuffer> => {
    const [iv, encryptedSymmetricKey] = deserializeEncryptedItem(encryptedSymmetricKeyB64);
    return await aesDecrypt(encryptedSymmetricKey, iv, masterKey);
}

export const decryptVaultItem = async(encryptedVaultItemB64 : string, symmetricKey : ArrayBuffer) : Promise<string> => {
    const [iv, encryptedVaultItem] = deserializeEncryptedItem(encryptedVaultItemB64);
    const decryptedVaultItem = await aesDecrypt(encryptedVaultItem, iv, symmetricKey);

    return decoder.decode(decryptedVaultItem);
}
export const pbkdf2Hash = async (salt : ArrayBuffer, payload : ArrayBuffer) : Promise<ArrayBuffer> => {
    const algorithmParams : Pbkdf2Params = {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: salt,
        iterations: ITERATIONS
    };

    const baseKey : CryptoKey = await window.crypto.subtle.importKey(
        'raw',
        payload,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    return window.crypto.subtle.deriveBits(algorithmParams, baseKey, 256)
}

export const serializeEncryptedItem = (encryptedItem : ArrayBuffer, iv : ArrayBuffer) : string => {
    return arrayBufferToBase64(iv) + arrayBufferToBase64(encryptedItem);
}

export const deserializeEncryptedItem = (serializedEncryptedItem : string) : Array<ArrayBuffer> => {
    const ivB64 = serializedEncryptedItem.substring(0, 16);
    const encryptedSymmetricKeyB64 = serializedEncryptedItem.substring(16);
    return [base64ToArrayBuffer(ivB64), base64ToArrayBuffer(encryptedSymmetricKeyB64)];
}

export const generateSymmetricKey = () : ArrayBuffer => {
    return getRandomBytes(32).buffer;
}

const cryptoKeyFromKeyBuffer = async (key : ArrayBuffer, usages : Array<KeyUsage>) : Promise<CryptoKey> => {
    const keyAlgorithmParams : AesKeyGenParams = {
        name: 'AES-GCM',
        length: 256
    };

    return await window.crypto.subtle.importKey(
        "raw",
        key,
        keyAlgorithmParams,
        false,
        usages
    );
}

const aesDecrypt = async (ciphertext : ArrayBuffer, iv : ArrayBuffer, key : ArrayBuffer) : Promise<ArrayBuffer> => {
    const decryptionKey = await cryptoKeyFromKeyBuffer(key, ['decrypt']);

    const decryptionParams : AesGcmParams = {
        name: 'AES-GCM',
        iv: iv
    };

    return await window.crypto.subtle.decrypt(
        decryptionParams,
        decryptionKey,
        ciphertext
    );
}

const aesEncrypt = async (payload : ArrayBuffer, iv : ArrayBuffer, key : ArrayBuffer) : Promise<ArrayBuffer> => {
    const encryptionKey = await cryptoKeyFromKeyBuffer(key, ['encrypt']);

    const encryptionParams : AesGcmParams = {
        name: 'AES-GCM',
        iv: iv
    }

    return await window.crypto.subtle.encrypt(
        encryptionParams,
        encryptionKey,
        payload
    );
}

const generateIV = () : ArrayBuffer => {
    return getRandomBytes(12).buffer;
}

const getRandomBytes = (length : number) => {
    const array = new Uint8Array(length);
    return window.crypto.getRandomValues(array);
}

/* Adapted from https://stackoverflow.com/a/9458996 */
export const arrayBufferToBase64 =  (buffer : ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/* Adapted from https://stackoverflow.com/a/21797381 */
export const base64ToArrayBuffer = (str : string) => {
    const binaryString = atob(str);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}