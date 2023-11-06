import { webcrypto } from 'crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { decryptSymmetricKey,
         decryptVaultItem,
         deriveMasterKey,
         deriveMasterPasswordHash,
         encryptSymmetricKey,
         encryptVaultItem,
         generateSymmetricKey } from '../src/lib/encryption';

beforeAll(() => {
    // @ts-ignore
    global.crypto = webcrypto;
});
afterAll(() => {
    delete global.crypto;
})

describe('deriveMasterKey', () => {
    it('should always hash the same input to the same output', async () => {
        const email : string = 'bob@example.com';
        const password : string = 'super-secret-password';
        const masterKeyOne : ArrayBuffer = await deriveMasterKey(email, password);
        const masterKeyTwo : ArrayBuffer = await deriveMasterKey(email, password);
        expect(masterKeyOne).toEqual(masterKeyTwo);
    })

    it('should produce a 32-byte key regardless of input length', async () => {
        const emailOne : string = 'bob@example.com';
        const passwordOne : string = 'super-secret-password';
        const masterKeyOne : ArrayBuffer = await deriveMasterKey(emailOne, passwordOne);

        const emailTwo : string = 'alice@thisisthelongestdomainnameever.org';
        const passwordTwo : string = 'this-is-the-secretest-password-i-could-imagine';
        const masterKeyTwo : ArrayBuffer = await deriveMasterKey(emailTwo, passwordTwo);

        expect(masterKeyOne.byteLength).toEqual(32);
        expect(masterKeyTwo.byteLength).toEqual(32);
    })
})

describe('deriveMasterPasswordHash', () => {
    it('should always hash the same input to the same output', async () => {
        const email : string = 'alice@example.com'
        const password : string = 'exceptionally-secret-password';
        const masterKey : ArrayBuffer = await deriveMasterKey(email, password);
        const hashOne : string = await deriveMasterPasswordHash(password, masterKey);
        const hashTwo : string = await deriveMasterPasswordHash(password, masterKey);
        expect(hashOne).toEqual(hashTwo);
    })

    it('should produce a 44-character Base64 string regardless of input length', async () => {
        const emailOne : string = 'bob@example.com';
        const passwordOne : string = 'super-secret-password';
        const masterKeyOne : ArrayBuffer = await deriveMasterKey(emailOne, passwordOne);
        const hashOne : string = await deriveMasterPasswordHash(passwordOne, masterKeyOne);

        const emailTwo : string = 'alice@thisisthelongestdomainnameever.org';
        const passwordTwo : string = 'this-is-the-secretest-password-i-could-imagine';
        const masterKeyTwo : ArrayBuffer = await deriveMasterKey(emailTwo, passwordTwo);
        const hashTwo : string = await deriveMasterPasswordHash(passwordTwo, masterKeyTwo);

        expect(hashOne.length).toEqual(44);
        expect(hashTwo.length).toEqual(44);
    })
})

describe('encryptSymmetricKey', () => {
    it('should generate different ciphertext on each encryption', async () => {
        const email : string = 'bob@example.com';
        const password : string = 'super-secret-password';
        const masterKey : ArrayBuffer = await deriveMasterKey(email, password);
        const symmetricKey : ArrayBuffer = generateSymmetricKey();

        const ciphertextOne : string = await encryptSymmetricKey(symmetricKey, masterKey);
        const ciphertextTwo : string = await encryptSymmetricKey(symmetricKey, masterKey);

        expect(ciphertextOne).not.toEqual(ciphertextTwo);
    })
})

describe('decryptSymmetricKey', () => {
    it('should correctly decrypt key encrypted with encryptSymmetricKey', async () => {
        const email : string = 'bob@example.com';
        const password : string = 'super-secret-password';
        const masterKey : ArrayBuffer = await deriveMasterKey(email, password);
        const symmetricKey : ArrayBuffer = generateSymmetricKey();
        const ciphertext : string = await encryptSymmetricKey(symmetricKey, masterKey);
        const decryptedSymmetricKey : ArrayBuffer = await decryptSymmetricKey(ciphertext, masterKey);

        expect(decryptedSymmetricKey).toEqual(symmetricKey);
    })
})

describe('encryptVaultItem', () => {
    it('should generate different ciphertext on each encryption', async () => {
        const symmetricKey : ArrayBuffer = generateSymmetricKey();
        const vaultItem = {
            'url': 'https://google.com',
            'userid': 'alice@example.com',
            'password': 'UZG4TJp1jEzJcFaXlRsi'
        };
        const vaultItemString : string = JSON.stringify(vaultItem);

        const ciphertextOne : string = await encryptVaultItem(vaultItemString, symmetricKey);
        const ciphertextTwo : string = await encryptVaultItem(vaultItemString, symmetricKey);

        expect(ciphertextOne).not.toEqual(ciphertextTwo);
    })
})

describe('decryptVaultItem', () => {
    it('should correctly decrypt vault item encrypted with encryptVaultItem', async () => {
        const symmetricKey : ArrayBuffer = generateSymmetricKey();
        const vaultItem = {
            'url': 'https://google.com',
            'userid': 'alice@example.com',
            'password': 'UZG4TJp1jEzJcFaXlRsi'
        };
        const vaultItemString = JSON.stringify(vaultItem);

        const ciphertext : string = await encryptVaultItem(vaultItemString, symmetricKey);
        const plaintext : string = await decryptVaultItem(ciphertext, symmetricKey);

        expect(plaintext).toEqual(vaultItemString);
    })
})