import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/AppConstant.js";

const customAxios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

customAxios.interceptors.request.use((config) => {
    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default customAxios;
