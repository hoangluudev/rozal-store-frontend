import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_FILTER_OPTIONS_PENDING,
  FETCH_PRODUCT_FILTER_OPTIONS_SUCCESS,
  FETCH_PRODUCT_FILTER_OPTIONS_ERROR,
  FETCH_PRODUCT_BY_CODE_PENDING,
  FETCH_PRODUCT_BY_CODE_SUCCESS,
  FETCH_PRODUCT_BY_CODE_ERROR,
  FETCH_RELATED_PRODUCTS_BY_CODE_PENDING,
  FETCH_RELATED_PRODUCTS_BY_CODE_SUCCESS,
  FETCH_RELATED_PRODUCTS_BY_CODE_ERROR,
} from "../../constants/client/product.constant";
import getServerURL from "../../config/ipconfig";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/products-alpha";

export const fetchProducts = (filterSearchQuery) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      await dispatch({
        type: FETCH_PRODUCTS_PENDING,
      });
      const response = await fetch(
        BASE_URL + filterSearchQuery,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCTS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchProductFilterOptions = () => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      await dispatch({
        type: FETCH_PRODUCT_FILTER_OPTIONS_PENDING,
      });
      const response = await fetch(
        BASE_URL + "/filter-options",
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_PRODUCT_FILTER_OPTIONS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCT_FILTER_OPTIONS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchProductByCode = (paramProductCode) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      await dispatch({
        type: FETCH_PRODUCT_BY_CODE_PENDING,
      });
      const response = await fetch(
        BASE_URL + "/id/" + paramProductCode,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_PRODUCT_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCT_BY_CODE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchRelatedProductsByCode = (paramProductCode) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_RELATED_PRODUCTS_BY_CODE_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/related-products/" + paramProductCode,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_RELATED_PRODUCTS_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_RELATED_PRODUCTS_BY_CODE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
