import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_URL_SERVER });

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(sessionStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("api/auth/login", formData);
export const refreshLogin = () => API.post("api/auth/refreshLogin");