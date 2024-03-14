import axios from "axios";

const local = "http://localhost:5000/";
const proxy = "https://orderaheadproxyserver.azurewebsites.net/";
const BASE_URL = proxy;

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

// Add interceptors as needed (see previous example)
// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
export default apiInstance;
