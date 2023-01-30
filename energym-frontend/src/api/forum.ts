import axios from "axios";
import { BASE_URL } from "./api";


export const forumapi = axios.create({
    baseURL: BASE_URL.FORUM
});

export const forumapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.FORUM,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});