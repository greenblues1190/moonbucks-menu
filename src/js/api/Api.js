import HTTP_METHOD from './http_method.js';
import {
  BASE_URL,
  API_FAIL_LOAD_CATEGORY,
  API_FAIL_ADD_MENU,
  API_FAIL_EDIT_MENU,
  API_FAIL_TOGGLE_SOLDOUT,
  API_FAIL_DELETE_MENU,
} from '../config/config.js';

const request = async (url, option, errorCode) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw errorCode;
  }

  return response.json();
};

const requestWithoutJson = async (url, option, errorCode) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw errorCode;
  }
};

const Api = {
  getAllMenuByCategory(category) {
    const url = `${BASE_URL}/category/${category}/menu`;
    const option = null;

    return request(url, option, API_FAIL_LOAD_CATEGORY);
  },
  addMenu(category, name) {
    const url = `${BASE_URL}/category/${category}/menu`;
    const option = HTTP_METHOD.POST({ name });

    return request(url, option, API_FAIL_ADD_MENU);
  },
  editMenu(category, id, name) {
    const url = `${BASE_URL}/category/${category}/menu/${id}`;
    const option = HTTP_METHOD.PUT({ name });

    return request(url, option, API_FAIL_EDIT_MENU);
  },
  toggleSoldOutMenu(category, id) {
    const url = `${BASE_URL}/category/${category}/menu/${id}/soldout`;
    const option = HTTP_METHOD.PUT();

    return request(url, option, API_FAIL_TOGGLE_SOLDOUT);
  },
  removeMenu(category, id) {
    const url = `${BASE_URL}/category/${category}/menu/${id}`;
    const option = HTTP_METHOD.DELETE();

    return requestWithoutJson(url, option, API_FAIL_DELETE_MENU);
  },
};

export default Api;
