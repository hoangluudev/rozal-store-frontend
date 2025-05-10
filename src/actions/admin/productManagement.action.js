import {
  FETCH_PRODUCT_ADMIN_PENDING,
  FETCH_PRODUCT_ADMIN_SUCCESS,
  FETCH_PRODUCT_ADMIN_ERROR,
  CREATE_PRODUCT_ADMIN_PENDING,
  CREATE_PRODUCT_ADMIN_SUCCESS,
  CREATE_PRODUCT_ADMIN_ERROR,
  UPDATE_PRODUCT_ADMIN_PENDING,
  UPDATE_PRODUCT_ADMIN_SUCCESS,
  UPDATE_PRODUCT_ADMIN_ERROR,
  DELETE_PRODUCT_ADMIN_PENDING,
  DELETE_PRODUCT_ADMIN_SUCCESS,
  DELETE_PRODUCT_ADMIN_ERROR,
  GET_SELECTED_PRODUCT_IDS,
  ON_SEARCH_PRODUCT_PENDING,
  ON_SEARCH_PRODUCT_SUCCESS,
  ON_SEARCH_PRODUCT_ERROR,
  ON_FILTER_PRODUCT_PENDING,
  ON_FILTER_PRODUCT_SUCCESS,
  ON_FILTER_PRODUCT_ERROR,
} from "../../constants/admin/productManagement.constant";
import { getAccessToken } from "../../services/tokenService";

import getServerURL from "../../config/ipconfig";
const SERVER_URL = getServerURL();
const PRODUCT_URL = SERVER_URL + "/admin/product";

const ERROR_MESSAGES = {
  imageTooLarge:
    "The image you are trying to upload is too large. Please reduce the file size and try again.",
};
const STATUS_MESSAGES = {
  internalServerError: "Oops! Something went wrong. Please try again later.",
};
const SUCCESS_MESSAGES = {
  deleteProductSuccess: "Delete Product Successfully",
};

export const fetchProducts = (currentPage, itemPerPage) => {
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
      const vQueryParams = new URLSearchParams();
      vQueryParams.append("page", currentPage);
      vQueryParams.append("limit", itemPerPage);
      await dispatch({
        type: FETCH_PRODUCT_ADMIN_PENDING,
      });
      const response = await fetch(
        PRODUCT_URL + "?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: FETCH_PRODUCT_ADMIN_SUCCESS,
        payload: data,
        totalCount: dataObj.totalItems,
        limit: dataObj.limit,
        currentPage: dataObj.currentPage,
        categoryList: dataObj.categoryList,
        brandList: dataObj.brandList,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_PRODUCT_ADMIN_ERROR,
        error: error,
      });
    }
  };
};
export const createNewProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_ADMIN_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(productData),
      };
      const response = await fetch(PRODUCT_URL, requestOptions);

      if (response.status === 413) {
        return dispatch({
          type: CREATE_PRODUCT_ADMIN_ERROR,
          errorMessage: ERROR_MESSAGES.imageTooLarge,
        });
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product.");
      }
      let dataJson = await response.json();
      const data = dataJson.data;
      dispatch({
        type: CREATE_PRODUCT_ADMIN_SUCCESS,
        data: data,
        successMessage: dataJson.message,
      });
    } catch (error) {
      await dispatch({
        type: CREATE_PRODUCT_ADMIN_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const updateProductByID = (productData, productID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_ADMIN_PENDING });
      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(productData),
      };

      const response = await fetch(
        PRODUCT_URL + "/" + productID,
        requestOptions
      );

      if (response.status === 413) {
        return dispatch({
          type: UPDATE_PRODUCT_ADMIN_ERROR,
          errorMessage: ERROR_MESSAGES.imageTooLarge,
        });
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }

      let dataJson = await response.json();
      const data = dataJson.data;
      dispatch({
        type: UPDATE_PRODUCT_ADMIN_SUCCESS,
        data: data,
        successMessage: dataJson.message,
      });
    } catch (error) {
      await dispatch({
        type: UPDATE_PRODUCT_ADMIN_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const deleteProductByID = (productID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: DELETE_PRODUCT_ADMIN_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: DELETE_PRODUCT_ADMIN_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        PRODUCT_URL + "/delete-product/" + productID,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      dispatch({
        type: DELETE_PRODUCT_ADMIN_SUCCESS,
        successMessage: SUCCESS_MESSAGES.deleteProductSuccess,
      });
    } catch (error) {
      await dispatch({
        type: DELETE_PRODUCT_ADMIN_ERROR,
        errorMessage: STATUS_MESSAGES.internalServerError,
      });
    }
  };
};
export const getSelectedIDs = (productIDs) => ({
  type: GET_SELECTED_PRODUCT_IDS,
  payload: productIDs,
});
export const deleteMultipleProductByID = (productIDsList) => {
  const requestDataObj = {
    productIDs: productIDsList,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: DELETE_PRODUCT_ADMIN_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: DELETE_PRODUCT_ADMIN_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        PRODUCT_URL + "/delete-multiple-product",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      dispatch({
        type: DELETE_PRODUCT_ADMIN_SUCCESS,
        successMessage: SUCCESS_MESSAGES.deleteProductSuccess,
      });
    } catch (error) {
      await dispatch({
        type: DELETE_PRODUCT_ADMIN_ERROR,
        errorMessage: STATUS_MESSAGES.internalServerError,
      });
    }
  };
};

export const onProductSearch = (currentPage, itemPerPage, searchText) => {
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
      const vQueryParams = new URLSearchParams();
      vQueryParams.append("page", currentPage);
      vQueryParams.append("limit", itemPerPage);
      vQueryParams.append("searchText", searchText);

      await dispatch({
        type: ON_SEARCH_PRODUCT_PENDING,
      });

      const response = await fetch(
        PRODUCT_URL + "/search-product?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: ON_SEARCH_PRODUCT_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isSearch: dataObj.isSearching,
        searchValue: searchText,
      });
    } catch (error) {
      return dispatch({
        type: ON_SEARCH_PRODUCT_ERROR,
        error: error,
      });
    }
  };
};
export const onProductFilter = (currentPage, itemPerPage, filterValue) => {
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

      const vQueryParams = new URLSearchParams({
        page: currentPage,
        limit: itemPerPage,
        ...(filterValue.gender && { gender: filterValue.gender }),
        ...(filterValue.category && { category: filterValue.category }),
        ...(filterValue.brand && { brand: filterValue.brand }),
        ...(filterValue.stockStatus && {
          stockStatus: filterValue.stockStatus,
        }),
        ...(filterValue.status && { status: filterValue.status }),
      });
      await dispatch({
        type: ON_FILTER_PRODUCT_PENDING,
      });
      const response = await fetch(
        PRODUCT_URL + "/filter-product?" + vQueryParams.toString(),
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: ON_FILTER_PRODUCT_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isFilterOn: dataObj.isFilterApplied,
        filterValue: filterValue,
      });
    } catch (error) {
      return dispatch({
        type: ON_FILTER_PRODUCT_ERROR,
        error: error,
      });
    }
  };
};
export const onSearchedProductPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { searchValue } = getState().PRODUCTS_ADMIN_REDUCERS;
    dispatch(onProductSearch(currentPage, itemPerPage, searchValue));
  };
};
export const onFilteredProductPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { filterValue } = getState().PRODUCTS_ADMIN_REDUCERS;
    dispatch(onProductFilter(currentPage, itemPerPage, filterValue));
  };
};
