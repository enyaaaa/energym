import axios from "axios";
import { BASE_URL } from "./api";


export const authapi = axios.create({
    baseURL: BASE_URL.AUTH
});

export const authapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.AUTH,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});