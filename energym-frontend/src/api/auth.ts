import axios from "axios";
import { BASE_URL, LOCAL_URL } from "./api";

const user = JSON.parse(localStorage.getItem("persist:root")!)?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const authapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH
});

export const authapiToken = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALAUTH : BASE_URL.AUTH,
    headers: {
        "content-type": "application/json",
        "Accept": "application/json",
        token: `Bearer ${TOKEN}`
    },
});