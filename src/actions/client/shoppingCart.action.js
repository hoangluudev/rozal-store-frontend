import {
  CREATE_CART_ITEM_PENDING,
  CREATE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_ERROR,
  FETCH_CART_PENDING,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  PATCH_CART_ITEM_PENDING,
  PATCH_CART_ITEM_SUCCESS,
  PATCH_CART_ITEM_ERROR,
  DELETE_CART_ITEM_PENDING,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_ERROR,
} from "../../constants/client/shoppingCart.constant";
import { getAccessToken } from "../../services/tokenService";

import getServerURL from "../../config/ipconfig";
const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/shopping-cart";

export const createCartItem = (requestData) => {
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
        body: JSON.stringify(requestData),
      };
      const response = await fetch(BASE_URL, requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: CREATE_CART_ITEM_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: CREATE_CART_ITEM_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchUserShoppingCart = (filterSearchQuery) => {
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

      const response = await fetch(
        BASE_URL + filterSearchQuery,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_CART_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_CART_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateCartItem = (requestDataObj, cartItemId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PATCH_CART_ITEM_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };
      const response = await fetch(
        BASE_URL + "/id/" + cartItemId,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      let data = await response.json();

      dispatch({
        type: PATCH_CART_ITEM_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PATCH_CART_ITEM_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const selectAllCartItem = (requestDataObj) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PATCH_CART_ITEM_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };
      const response = await fetch(BASE_URL, requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      let data = await response.json();

      dispatch({
        type: PATCH_CART_ITEM_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PATCH_CART_ITEM_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteCartItem = (cartItemId) => {
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

      const response = await fetch(
        BASE_URL + "/id/" + cartItemId,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      dispatch({
        type: DELETE_CART_ITEM_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_CART_ITEM_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteAllSelectedCarts = () => {
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

      const response = await fetch(BASE_URL + "/bulk/delete", requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      dispatch({
        type: DELETE_CART_ITEM_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_CART_ITEM_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
