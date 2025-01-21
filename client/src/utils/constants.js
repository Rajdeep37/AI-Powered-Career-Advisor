import axios from "axios"
export const baseURL = "https://career-advisor-server-omega.vercel.app/api/v1"
export const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, 
});
