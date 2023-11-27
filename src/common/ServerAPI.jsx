import { default as axios } from "../common/CustomAxios";
import {
  decryptSymmetricKey,
  decryptVaultItem,
  deriveMasterKey,
  deriveMasterPasswordHash,
  encryptSymmetricKey,
  generateSymmetricKey,
} from "../lib/encryption";
import { COLLECTIONS_URL, CREATE_ACCOUNT_URL, ITEM_URL, LOGIN_ACCOUNT_URL } from "../config/AppConstant";

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

  const response = await axios.post(
    LOGIN_ACCOUNT_URL,
    {
        email: email,
        password: passwordHash,
    },
  );

  const encryptedSymmetricKey = response.data.encrypted_symmetric_key;
  return await decryptSymmetricKey(encryptedSymmetricKey, masterKey);
}

async function getUserData(symmetricKey) {
  const collectionResponse = await axios.get(
    COLLECTIONS_URL
  );
  let itemResponse = await axios.get(
    ITEM_URL
  );

  const collections = collectionResponse.data;
  let items = itemResponse.data;

  items = await decryptItems(items, symmetricKey);

  return {collections, items};
}

async function decryptItems(items, symmetricKey) {
  for(let key in items) {
    let vaultItem = await decryptVaultItem(items[key]["encrypted_data"], symmetricKey);
    items[key]["data"] = JSON.parse(vaultItem);
    delete items[key]["encrypted_data"]
  }

  return items;
}

export { createAccount, getUserData, loginAccount };
