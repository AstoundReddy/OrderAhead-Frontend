import apiInstance from "../config/axiosConfig";
import { EDIT_MENU_ITEM } from "./endpoints";

const menuApi = {
  editItemById: async (itemId, item) => {
    console.log(itemId, item);
    const endpoint = { ...EDIT_MENU_ITEM, url: EDIT_MENU_ITEM.url + itemId, data: item };
    return apiInstance(endpoint);
  },
};

export { menuApi };
