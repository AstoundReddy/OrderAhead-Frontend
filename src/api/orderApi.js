import apiInstance from "../config/axiosConfig";
import { CREATE_ORDER, FETCH_ORDERS_BY_USER, GET_ORDER_DETAILS, RATE_ITEM_IN_ORDER, UPDATE_ORDER, RATE_ORDER, GET_ORDERS_BY_RESTAURANT } from "./endpoints";

const orderApi = {
  createOrder: async (orderData) => {
    const endpoint = { ...CREATE_ORDER, data: orderData };
    // console.log(orderData);
    return apiInstance(endpoint);
  },
  fetchOrdersByUser: async (userId) => {
    return apiInstance({ ...FETCH_ORDERS_BY_USER, url: FETCH_ORDERS_BY_USER.url + userId });
  },
  fetchOrderDetailsById: async (orderId) => {
    return apiInstance({ ...GET_ORDER_DETAILS, url: GET_ORDER_DETAILS.url + orderId });
  },
  rateItemById: async (orderDetailsId, rating) => {
    return apiInstance({ ...RATE_ITEM_IN_ORDER, url: RATE_ITEM_IN_ORDER.url + orderDetailsId + "?rating=" + rating });
  },
  rateOrderById: async (orderId, rating) => {
    console.log(orderId, rating);
    return apiInstance({ ...RATE_ORDER, url: RATE_ORDER.url + orderId + "/rating?rating=" + rating });
  },
  getOrdersByRestaurant: async (restaurantId, status, page) => {
    return apiInstance({ ...GET_ORDERS_BY_RESTAURANT, url: GET_ORDERS_BY_RESTAURANT.url + restaurantId + "?status=" + status });
  },
  updateOrderById: async (orderId, requestBody) => {
    let url = UPDATE_ORDER.url + orderId;
    return apiInstance({ ...UPDATE_ORDER, url, data: requestBody });
  },
};

export { orderApi };
