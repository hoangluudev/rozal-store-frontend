import { ORDER_MANAGEMENT_CONST } from "../../constants";
import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";
const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/admin/orders";

export const fetchOrders = (currentPage, itemPerPage) => {
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
        type: ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_PENDING,
      });
      const response = await fetch(
        BASE_URL + "?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;

      return dispatch({
        type: ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_SUCCESS,
        payload: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
      });
    } catch (error) {
      return dispatch({
        type: ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_ERROR,
        error: error,
      });
    }
  };
};
export const updateOrderByID = (orderData, orderID) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_PENDING,
      });
      const accesstoken = getAccessToken();
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(orderData),
      };

      const response = await fetch(BASE_URL + "/" + orderID, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order");
      }

      const dataObj = await response.json();
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_SUCCESS,
        successMessage: dataObj.message,
      });
    } catch (error) {
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const deleteOrderByID = (orderID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        BASE_URL + "/delete-order/" + orderID,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      dispatch({
        type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_SUCCESS,
        successMessage: "Delete order success!",
      });
    } catch (error) {
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const getSelectedIDs = (orderIDs) => ({
  type: ORDER_MANAGEMENT_CONST.GET_SELECTED_ORDER_IDS,
  payload: orderIDs,
});
export const deleteMultipleOrderByID = (orderIDsList) => {
  const requestDataObj = {
    orderIDs: orderIDsList,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        BASE_URL + "/delete-multiple-order",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      dispatch({
        type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_SUCCESS,
        successMessage: "Delete order success!",
      });
    } catch (error) {
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_ERROR,
        errorMessage: error.message,
      });
    }
  };
};

export const onOrderSearch = (currentPage, itemPerPage, searchText) => {
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
        type: ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/search-order?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isSearch: dataObj.isSearching,
        searchValue: searchText,
      });
    } catch (error) {
      return dispatch({
        type: ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_ERROR,
        error: error,
      });
    }
  };
};
export const onOrderFilter = (currentPage, itemPerPage, filterValue) => {
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
        ...(filterValue.paymentMethod && {
          paymentMethod: filterValue.paymentMethod,
        }),
        ...(filterValue.progressStatus && {
          progressStatus: filterValue.progressStatus,
        }),
        ...(filterValue.orderStatus && {
          orderStatus: filterValue.orderStatus,
        }),
        ...(filterValue.createdDate && {
          createdDate: filterValue.createdDate,
        }),
      });
      await dispatch({
        type: ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_PENDING,
      });
      const response = await fetch(
        BASE_URL + "/filter-order?" + vQueryParams.toString(),
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isFilterOn: dataObj.isFilterApplied,
        filterValue: filterValue,
      });
    } catch (error) {
      return dispatch({
        type: ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_ERROR,
        error: error,
      });
    }
  };
};
export const onSearchedOrderPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { searchValue } = getState().ORDERS_ADMIN_REDUCERS;
    dispatch(onOrderSearch(currentPage, itemPerPage, searchValue));
  };
};
export const onFilteredOrderPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { filterValue } = getState().ORDERS_ADMIN_REDUCERS;
    dispatch(onOrderFilter(currentPage, itemPerPage, filterValue));
  };
};
