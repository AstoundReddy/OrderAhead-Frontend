import axios from "axios";

const BASE_URL = "https://orderaheadproxyserver.azurewebsites.net/";

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
