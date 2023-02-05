import axios from "axios";
import { BASE_URL, LOCAL_URL } from "./api";

export const localauthapi = axios.create({
    /* baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH */
    baseURL: LOCAL_URL.LOCALAUTH,
    withCredentials: true,
});

export const authapi = axios.create({
    /* baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH */
    baseURL: BASE_URL.AUTH,
    withCredentials: true,
});