import { default as axios } from "../common/CustomAxios";
import {
  deriveMasterKey,
  deriveMasterPasswordHash,
  encryptSymmetricKey,
  generateSymmetricKey,
} from "../lib/encryption";
import { CREATE_ACCOUNT_URL, LOGIN_ACCOUNT_URL } from "../config/AppConstant";

async function createAccount(email, password) {
  const masterKey = await deriveMasterKey(email, password);
  const passwordHash = await deriveMasterPasswordHash(password, masterKey);
  const symmetricKey = generateSymmetricKey();
  const encryptedSymetricKey = await encryptSymmetricKey(
    symmetricKey,
    masterKey
  );

  return axios.post(
    CREATE_ACCOUNT_URL,
    {
      email: email,
      password: passwordHash,
      encrypted_symmetric_key: encryptedSymetricKey,
    },
  );
}

async function loginAccount(email, password) {
  const masterKey = await deriveMasterKey(email, password);
  const passwordHash = await deriveMasterPasswordHash(password, masterKey);

  return axios.post(
    LOGIN_ACCOUNT_URL,
    {
      email: email,
      password: passwordHash,
    },
  );
}

export { createAccount, loginAccount };
