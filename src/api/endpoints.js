export const GET_ALL_RESTAURANTS = {
  method: "GET",
  url: "/restaurants?page=0",
};
export const GET_RESTAURANT_BY_ID = {
  method: "GET",
  url: "/restaurants/",
};
export const CREATE_ORDER = {
  method: "POST",
  url: "/orders",
};
export const FETCH_ORDERS_BY_USER = {
  method: "GET",
  url: "/orders/user/",
};
export const GET_ORDER_DETAILS = {
  method: "GET",
  url: "/orderDetails/",
};
export const RATE_ITEM_IN_ORDER = {
  method: "PUT",
  url: "/orderDetails/",
};
export const RATE_ORDER = {
  method: "PUT",
  url: "/orders/",
};
export const GET_ORDERS_BY_RESTAURANT = {
  method: "GET",
  url: "/orders/restaurant/",
};
export const UPDATE_ORDER = {
  method: "PUT",
  url: "/orders/",
};
export const ADD_MENU_ITEM = {
  method: "POST",
  url: "/restaurants/",
};
export const EDIT_MENU_ITEM = {
  method: "PUT",
  url: "/menuItems/",
};
export const ADD_RESTAURANT = {
  method: "POST",
  url: "/restaurants/manager/",
};
export const LOGIN_MANAGER = {
  method: "POST",
  url: "/users/manager/login",
};
export const REGISTER_MANAGER = {
  method: "POST",
  url: "/users/manager/register",
};
export const REGISTER_USER = {
  method: "POST",
  url: "/users/register",
};
export const LOGIN_USER = {
  method: "POST",
  url: "/users/login",
};
export const GET_RESTAURANT_BY_MANAGER_ID = {
  method: "GET",
  url: "/restaurants/manager/",
};
export const SEARCH_QUERY = {
  method: "GET",
  url: "/restaurants/search",
};
