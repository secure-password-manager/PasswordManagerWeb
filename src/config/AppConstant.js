const API_BASE_URL = import.meta.env.DEV ? "http://localhost:8000/" : "https://api.key-fortress.com/";
const CREATE_ACCOUNT_URL = "signup/";
const LOGIN_ACCOUNT_URL = "login/";
const LOGOUT_ACCOUNT_URL = "logout";
const COLLECTIONS_URL = "vault_collections/";
const ITEMS_URL = "vault_items/"
const USER_KEY = "user_key/"


export {
    API_BASE_URL,
    COLLECTIONS_URL,
    CREATE_ACCOUNT_URL,
    ITEM_URL,
    LOGIN_ACCOUNT_URL,
    LOGOUT_ACCOUNT_URL,
    COLLECTIONS_URL,
    ITEMS_URL,
    USER_KEY
}
