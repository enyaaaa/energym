import axios from "axios";
import { BASE_URL, LOCAL_URL } from "./api";


export const bookingsapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? LOCAL_URL.LOCALBOOKINGS : BASE_URL.BOOKINGS
});

export const bookingsapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.BOOKINGS,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
        
    },
});