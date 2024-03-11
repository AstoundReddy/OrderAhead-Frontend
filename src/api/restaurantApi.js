import apiInstance from "../config/axiosConfig";
import { GET_ALL_RESTAURANTS, GET_RESTAURANT_BY_ID, ADD_MENU_ITEM, SEARCH_QUERY, ADD_RESTAURANT, LOGIN_MANAGER, REGISTER_MANAGER } from "./endpoints";

const restaurantApi = {
  getAllRestaurants: async () => {
    return apiInstance(GET_ALL_RESTAURANTS);
  },

  getRestaurantById: async (id) => {
    const endpoint = { ...GET_RESTAURANT_BY_ID, url: GET_RESTAURANT_BY_ID.url + id };
    return apiInstance(endpoint);
  },
  addItemByRestaurantId: async (id, item) => {
    const endpoint = { ...ADD_MENU_ITEM, url: ADD_MENU_ITEM.url + id + "/menuItem", data: item };
    return apiInstance(endpoint);
  },
  addRestaurantByManager: async (restaurant, managerId) => {
    const endpoint = { ...ADD_RESTAURANT, url: ADD_RESTAURANT.url + managerId, data: restaurant };
    return apiInstance(endpoint);
  },
  loginManager: async (manager) => {
    const endpoint = { ...LOGIN_MANAGER, url: LOGIN_MANAGER.url, data: manager };
    return apiInstance(endpoint);
  },
  registerManager: async (data) => {
    const endpoint = {
      ...REGISTER_MANAGER,
      url: REGISTER_MANAGER.url,
      data: data,
    };
    return apiInstance(endpoint);
  },
  searchByString: async (searchString) => {
    return apiInstance({ ...SEARCH_QUERY, url: SEARCH_QUERY.url + "?searchString=" + searchString });
  },
};

export { restaurantApi };
