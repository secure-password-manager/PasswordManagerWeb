import { default as axios } from "../common/CustomAxios";
import {
  base64ToArrayBuffer,
  decryptSymmetricKey,
  decryptVaultItem,
  deriveMasterKey,
  deriveMasterPasswordHash,
  encryptSymmetricKey,
  generateSymmetricKey,
  encryptVaultItem,
} from "../lib/encryption";
import {
  COLLECTIONS_URL,
  CREATE_ACCOUNT_URL,
  ITEMS_URL,
  LOGIN_ACCOUNT_URL,
} from "../config/AppConstant";

async function createAccount(email, password) {
  const masterKey = await deriveMasterKey(email, password);
  const passwordHash = await deriveMasterPasswordHash(password, masterKey);
  const symmetricKey = generateSymmetricKey();
  const encryptedSymetricKey = await encryptSymmetricKey(
    symmetricKey,
    masterKey
  );

  return axios.post(CREATE_ACCOUNT_URL, {
    email: email,
    password: passwordHash,
    encrypted_symmetric_key: encryptedSymetricKey,
  });
}

async function loginAccount(email, password) {
  const masterKey = await deriveMasterKey(email, password);
  const passwordHash = await deriveMasterPasswordHash(password, masterKey);

  const response = await axios.post(LOGIN_ACCOUNT_URL, {
    email: email,
    password: passwordHash,
  });

  const encryptedSymmetricKey = response.data.encrypted_symmetric_key;
  return await decryptSymmetricKey(encryptedSymmetricKey, masterKey);
}

async function getUserData(symmetricKey) {
  const collectionResponse = await axios.get(COLLECTIONS_URL);
  let itemResponse = await axios.get(ITEMS_URL);

  const collections = collectionResponse.data;
  let items = itemResponse.data;

  items = await decryptItems(items, base64ToArrayBuffer(symmetricKey));

  return { collections, items };
}

async function decryptItems(items, symmetricKey) {
  for (let key in items) {
    let vaultItem = await decryptVaultItem(
      items[key]["encrypted_data"],
      symmetricKey
    );
    items[key]["data"] = JSON.parse(vaultItem);
    delete items[key]["encrypted_data"];
  }

  return items;
}

async function postCollections(collectionName) {
  return axios.post(COLLECTIONS_URL, {
    name: collectionName,
  });
}

async function postVaultItem(itemString, symmetricKey, collectionUUID) {
  return axios.post(ITEMS_URL, {
    encrypted_data: await encryptVaultItem(
      itemString,
      base64ToArrayBuffer(symmetricKey)
    ),
    vault_collection: collectionUUID,
  });
}

export {
  createAccount,
  getUserData,
  loginAccount,
  postCollections,
  postVaultItem,
};
