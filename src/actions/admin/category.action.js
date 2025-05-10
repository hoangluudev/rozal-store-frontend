import {
  FETCH_ADMIN_CATEGORY_PENDING,
  FETCH_ADMIN_CATEGORY_SUCCESS,
  FETCH_ADMIN_CATEGORY_ERROR,
  FETCH_ADMIN_CATEGORY_BY_ID_PENDING,
  FETCH_ADMIN_CATEGORY_BY_ID_SUCCESS,
  FETCH_ADMIN_CATEGORY_BY_ID_ERROR,
  CREATE_ADMIN_CATEGORY_PENDING,
  CREATE_ADMIN_CATEGORY_SUCCESS,
  CREATE_ADMIN_CATEGORY_ERROR,
  UPDATE_ADMIN_CATEGORY_PENDING,
  UPDATE_ADMIN_CATEGORY_SUCCESS,
  UPDATE_ADMIN_CATEGORY_ERROR,
  DELETE_ADMIN_CATEGORY_PENDING,
  DELETE_ADMIN_CATEGORY_SUCCESS,
  DELETE_ADMIN_CATEGORY_ERROR,
  FETCH_ADMIN_CATEGORY_OPTIONS_PENDING,
  FETCH_ADMIN_CATEGORY_OPTIONS_SUCCESS,
  FETCH_ADMIN_CATEGORY_OPTIONS_ERROR,
  GET_SELECTED_IDS,
  FETCH_ADMIN_PRODUCT_TYPE_PENDING,
  FETCH_ADMIN_PRODUCT_TYPE_SUCCESS,
  FETCH_ADMIN_PRODUCT_TYPE_ERROR,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_PENDING,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_SUCCESS,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_ERROR,
  UPDATE_ADMIN_PRODUCT_TYPE_PENDING,
  UPDATE_ADMIN_PRODUCT_TYPE_SUCCESS,
  UPDATE_ADMIN_PRODUCT_TYPE_ERROR,
} from "../../constants/admin/category.constant";
import { getAccessToken } from "../../services/tokenService";

import getServerURL from "../../config/ipconfig";
const SERVER_URL = getServerURL();
const CATEGORY_URL = SERVER_URL + "/admin/categories";
const PRODUCT_TYPE_URL = SERVER_URL + "/admin/product-types";

export const fetchCategory = (filterSearchQuery) => {
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
        type: FETCH_ADMIN_CATEGORY_PENDING,
      });
      const response = await fetch(
        CATEGORY_URL + filterSearchQuery,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchCategoryByID = (paramID) => {
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
        type: FETCH_ADMIN_CATEGORY_BY_ID_PENDING,
      });
      const response = await fetch(
        CATEGORY_URL + "/id/" + paramID,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_ADMIN_CATEGORY_BY_ID_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ADMIN_CATEGORY_BY_ID_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createCategory = (requestDataObj) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ADMIN_CATEGORY_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };
      const response = await fetch(CATEGORY_URL, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category.");
      }
      let data = await response.json();

      dispatch({
        type: CREATE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: CREATE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateCategoryByID = (requestDataObj, paramID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ADMIN_CATEGORY_PENDING });
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
        CATEGORY_URL + "/" + paramID,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category.");
      }

      let data = await response.json();

      dispatch({
        type: UPDATE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: UPDATE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteCategoryByID = (paramID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: DELETE_ADMIN_CATEGORY_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        CATEGORY_URL + "/delete/" + paramID,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category.");
      }
      let data = await response.json();

      dispatch({
        type: DELETE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: DELETE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteMultipleCategoryByID = (paramIDs) => {
  const requestDataObj = {
    categoryIDs: paramIDs,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: DELETE_ADMIN_CATEGORY_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        CATEGORY_URL + "/delete-multiple",
        requestOptions
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category.");
      }
      let data = await response.json();

      dispatch({
        type: DELETE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: DELETE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};

export const getSelectedIDs = (paramIDs) => ({
  type: GET_SELECTED_IDS,
  payload: paramIDs,
});
export const fetchCategoryOptions = () => {
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
        type: FETCH_ADMIN_CATEGORY_OPTIONS_PENDING,
      });
      const response = await fetch(
        CATEGORY_URL + "/category-options",
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: FETCH_ADMIN_CATEGORY_OPTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ADMIN_CATEGORY_OPTIONS_ERROR,
        error: error,
      });
    }
  };
};

export const fetchProductType = (filterSearchQuery) => {
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
        type: FETCH_ADMIN_PRODUCT_TYPE_PENDING,
      });
      const response = await fetch(
        PRODUCT_TYPE_URL + filterSearchQuery,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_ADMIN_PRODUCT_TYPE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ADMIN_PRODUCT_TYPE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchProductTypeByID = (paramID) => {
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
        type: FETCH_ADMIN_PRODUCT_TYPE_BY_ID_PENDING,
      });
      const response = await fetch(
        PRODUCT_TYPE_URL + "/id/" + paramID,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_ADMIN_PRODUCT_TYPE_BY_ID_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ADMIN_PRODUCT_TYPE_BY_ID_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createProductType = (requestDataObj) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ADMIN_CATEGORY_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestDataObj),
      };
      const response = await fetch(PRODUCT_TYPE_URL, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subcategory.");
      }
      let data = await response.json();

      dispatch({
        type: CREATE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: CREATE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateProductTypeByID = (requestDataObj, paramID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ADMIN_PRODUCT_TYPE_PENDING });
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
        PRODUCT_TYPE_URL + "/" + paramID,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category.");
      }

      let data = await response.json();

      dispatch({
        type: UPDATE_ADMIN_PRODUCT_TYPE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: UPDATE_ADMIN_PRODUCT_TYPE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteProductTypeByID = (paramID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: DELETE_ADMIN_CATEGORY_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        PRODUCT_TYPE_URL + "/delete/" + paramID,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category.");
      }
      let data = await response.json();

      dispatch({
        type: DELETE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: DELETE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteMultipleProductTypeByID = (paramIDs) => {
  const requestDataObj = {
    subcategoryIDs: paramIDs,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();

      dispatch({ type: DELETE_ADMIN_CATEGORY_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        PRODUCT_TYPE_URL + "/delete-multiple",
        requestOptions
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category.");
      }
      let data = await response.json();

      dispatch({
        type: DELETE_ADMIN_CATEGORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: DELETE_ADMIN_CATEGORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
