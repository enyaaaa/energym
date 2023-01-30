import axios from "axios";
import { BASE_URL } from "./api";


export const classesapi = axios.create({
    baseURL: BASE_URL.CLASSES
});

export const classesapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.CLASSES,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});