import getServerURL from "../config/ipconfig";
import {
  CREATE_CART_ITEM_PENDING,
  CREATE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_ERROR,
  FETCH_CART_PENDING,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  UPDATE_CART_ITEM_PENDING,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_ERROR,
  DELETE_CART_ITEM_PENDING,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_ERROR,
} from "../constants/shoppingcart.constant";
import { getAccessToken } from "../services/tokenService";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/shopping-cart";

export const addItemToCart = (cartData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_CART_ITEM_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(cartData),
      };
      const response = await fetch(BASE_URL, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart.");
      }
      let dataJson = await response.json();
      const data = dataJson.data;
      dispatch({
        type: CREATE_CART_ITEM_SUCCESS,
        data: data,
        successMessage: dataJson.message,
      });
    } catch (error) {
      await dispatch({
        type: CREATE_CART_ITEM_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const getShoppingCart = () => {
  return async (dispatch) => {
    try {
      const accesstoken = getAccessToken();
      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-access-token": accesstoken,
        },
      };

      await dispatch({
        type: FETCH_CART_PENDING,
      });

      const response = await fetch(BASE_URL, requestOptions);

      const dataObj = await response.json();
      const data = dataObj.data.items;
      return dispatch({
        type: FETCH_CART_SUCCESS,
        data: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_CART_ERROR,
        error: error,
      });
    }
  };
};
export const updateCartItem = (cartId, qty) => {
  return async (dispatch) => {
    let productCartQty = {
      quantity: qty,
    };
    try {
      dispatch({ type: UPDATE_CART_ITEM_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(productCartQty),
      };
      const response = await fetch(BASE_URL + "/" + cartId, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart.");
      }

      let dataJson = await response.json();
      const data = dataJson.data;
      dispatch({
        type: UPDATE_CART_ITEM_SUCCESS,
        data: data,
      });
    } catch (error) {
      await dispatch({
        type: UPDATE_CART_ITEM_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const deleteCartItem = (cartId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_CART_ITEM_PENDING });

      const accessToken = getAccessToken();

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(BASE_URL + "/" + cartId, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to delete cart item");
      }
      const data = await response.json();
      dispatch({
        type: DELETE_CART_ITEM_SUCCESS,
        data: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_CART_ITEM_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
