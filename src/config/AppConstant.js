const API_BASE_URL = import.meta.env.DEV ? "http://localhost:8000/" : "https://api.key-fortress.com/";
const CREATE_ACCOUNT_URL = "signup/";
const LOGIN_ACCOUNT_URL = "login/";
const LOGOUT_ACCOUNT_URL = "logout";


export {
    API_BASE_URL,
    CREATE_ACCOUNT_URL,
    LOGIN_ACCOUNT_URL,
    LOGOUT_ACCOUNT_URL
}
