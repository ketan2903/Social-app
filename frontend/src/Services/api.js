import axios from "axios";

const API = axios.create({
  baseURL: "https://social-app-1-raj4.onrender.comapi"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
