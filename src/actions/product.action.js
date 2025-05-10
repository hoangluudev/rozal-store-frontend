import getServerURL from "../config/ipconfig";
import {
  FETCH_PRODUCTS_WITH_FILTER_PENDING,
  FETCH_PRODUCTS_WITH_FILTER_SUCCESS,
  FETCH_PRODUCTS_WITH_FILTER_ERROR,
  FETCH_PRODUCT_BY_ID_PENDING,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_ERROR,
  FETCH_FEATURED_PRODUCT_PENDING,
  FETCH_FEATURED_PRODUCT_SUCCESS,
  FETCH_FEATURED_PRODUCT_ERROR,
  FETCH_LATEST_PRODUCT_PENDING,
  FETCH_LATEST_PRODUCT_SUCCESS,
  FETCH_LATEST_PRODUCT_ERROR,
  FETCH_RELATED_PRODUCT_BY_ID_PENDING,
  FETCH_RELATED_PRODUCT_BY_ID_SUCCESS,
  FETCH_RELATED_PRODUCT_BY_ID_ERROR,
} from "../constants/client/product.constant";
import { searchParamsToObject } from "../utils/helperFunctions";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/products";

export const fetchProductsWithFilter = (filterSearchQuery) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_PRODUCTS_WITH_FILTER_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/product" + filterSearchQuery,
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: FETCH_PRODUCTS_WITH_FILTER_SUCCESS,
        data: data,
        limit: dataObj.limit,
        currentPage: dataObj.currentPage,
        isPageUnavailable: dataObj.isPageUnavailable,
        totalProductCount: dataObj.totalItemCount,
        isSearch: dataObj.isSearching,
        isFilterOn: dataObj.isFilterApplied,
        filterValue: searchParamsToObject(filterSearchQuery),
        categoryList: dataObj.categoryList,
        brandList: dataObj.brandList,
        genderList: dataObj.genderList,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCTS_WITH_FILTER_ERROR,
        error: error,
      });
    }
  };
};

export const fetchFeaturedProducts = () => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_FEATURED_PRODUCT_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/featured-product",
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: FETCH_FEATURED_PRODUCT_SUCCESS,
        data: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_FEATURED_PRODUCT_ERROR,
        error: error,
      });
    }
  };
};
export const fetchLatestProducts = () => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_LATEST_PRODUCT_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/latest-product",
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: FETCH_LATEST_PRODUCT_SUCCESS,
        data: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_LATEST_PRODUCT_ERROR,
        error: error,
      });
    }
  };
};
export const fetchProductByID = (paramID) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_PRODUCT_BY_ID_PENDING,
      });

      const response = await fetch(BASE_URL + "/" + paramID, requestOptions);

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: FETCH_PRODUCT_BY_ID_SUCCESS,
        data: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCT_BY_ID_ERROR,
        error: error,
      });
    }
  };
};
export const fetchRelatedProductsByID = (paramID) => {
  return async (dispatch) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await dispatch({
        type: FETCH_RELATED_PRODUCT_BY_ID_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/related-products/" + paramID,
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: FETCH_RELATED_PRODUCT_BY_ID_SUCCESS,
        data: data,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_RELATED_PRODUCT_BY_ID_ERROR,
        error: error,
      });
    }
  };
};
