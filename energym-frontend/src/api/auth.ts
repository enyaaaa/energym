import axios from "axios";
import { BASE_URL, LOCAL_URL } from "./api";


export const authapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH,
});

export const authapiToken = (token: string | null) => axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer" + token,
    },
});