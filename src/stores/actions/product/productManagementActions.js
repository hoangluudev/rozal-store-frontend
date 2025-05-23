import { PRODUCT_MANAGEMENT_CONST } from "../../constants";
import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/admin/products";

export const fetchProducts = (filterSearchQuery) => {
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
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_PENDING,
      });
      const response = await fetch(
        BASE_URL + filterSearchQuery,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchProductByID = (paramID) => {
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
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_PENDING,
      });
      const response = await fetch(BASE_URL + "/id/" + paramID, requestOptions);

      const data = await response.json();

      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createProduct = (requestDataObj) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };
      const response = await fetch(BASE_URL, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category.");
      }
      let data = await response.json();

      dispatch({
        type: PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateProductByID = (requestDataObj, paramID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(BASE_URL + "/" + paramID, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }

      let data = await response.json();

      dispatch({
        type: PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteProductByID = (paramID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        BASE_URL + "/delete/" + paramID,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product.");
      }
      let data = await response.json();

      dispatch({
        type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteMultipleSubcategoryByID = (paramIDs) => {
  const requestDataObj = {
    productIDs: paramIDs,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        BASE_URL + "/delete-multiple",
        requestOptions
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product.");
      }
      let data = await response.json();

      dispatch({
        type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_ERROR,
        payload: { message: error.message },
      });
    }
  };
};

export const getSelectedIDs = (paramIDs) => ({
  type: PRODUCT_MANAGEMENT_CONST.GET_SELECTED_IDS,
  payload: paramIDs,
});
export const fetchProductOptions = () => {
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
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_PENDING,
      });
      const response = await fetch(BASE_URL + "/options", requestOptions);

      const data = await response.json();

      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
