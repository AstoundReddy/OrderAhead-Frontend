import apiInstance from "../config/axiosConfig";
import { LOGIN_USER, REGISTER_USER } from "./endpoints";

const userApi = {
  loginUser: async (request) => {
    const endpoint = { ...LOGIN_USER, data: request };
    return apiInstance(endpoint);
  },
  registerUser: async (request) => {
    const endpoint = { ...REGISTER_USER, data: request };
    return apiInstance(endpoint);
  },
};

export { userApi };
