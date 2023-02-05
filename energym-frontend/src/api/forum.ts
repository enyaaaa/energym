import axios from "axios";
import { BASE_URL,LOCAL_URL } from "./api";


export const forumapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALFORUM : BASE_URL.FORUM
});

export const forumapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.FORUM,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});