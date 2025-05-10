import { ORDER_CONST } from "../../constants";
import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";

const SERVER_URL = getServerURL();
const ALPHA_BASE_URL = SERVER_URL + "/orders-alpha";
const ZALO_PAYMENT_URL = SERVER_URL + "/payment/zalopay";

export const fetchOrderCheckoutInfo = (filterParams) => {
  return async (dispatch) => {
    try {
      const accesstoken = getAccessToken();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-access-token": accesstoken,
        },
      };
      await dispatch({
        type: ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_PENDING,
      });
      const response = await fetch(
        ALPHA_BASE_URL + "/checkout-info" + filterParams,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.FETCH_ORDER_CHECKOUT_INFO_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchUserOrderHistory = (queryParams) => {
  return async (dispatch) => {
    try {
      const accesstoken = getAccessToken();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-access-token": accesstoken,
        },
      };
      await dispatch({
        type: ORDER_CONST.FETCH_USER_ORDER_HISTORY_PENDING,
      });
      const response = await fetch(
        ALPHA_BASE_URL + "/history" + queryParams,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.FETCH_USER_ORDER_HISTORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.FETCH_USER_ORDER_HISTORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createOrder = (requestData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONST.CREATE_ORDER_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(ALPHA_BASE_URL, requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.CREATE_ORDER_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.CREATE_ORDER_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchOrderByCode = (paramOrderCode) => {
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
        type: ORDER_CONST.FETCH_ORDER_BY_CODE_PENDING,
      });

      const response = await fetch(
        ALPHA_BASE_URL + "/id/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.FETCH_ORDER_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.FETCH_ORDER_BY_CODE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const fetchOrderStatusCheckoutByCode = (paramOrderCode) => {
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
        type: ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING,
      });

      const response = await fetch(
        ALPHA_BASE_URL + "/order-status/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const cancelOrderbyOrderCode = (requestData, paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        ALPHA_BASE_URL + "/cancel-order/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.CREATE_ORDER_CANCELLATION_REQUEST_ERROR,
        payload: { message: error.message },
      });
    }
  };
};

export const createZaloPaymentRetryRequest = (paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
      };
      const response = await fetch(
        ZALO_PAYMENT_URL + "/retry-payment/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateOrderPaymentMethod = (requestData, paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING,
      });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        ALPHA_BASE_URL + "/change-payment/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateOrderDeliveryAddress = (requestData, paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING,
      });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        ALPHA_BASE_URL + "/change-address/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const onRepurchaseOrder = (paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONST.ON_BUY_ORDER_AGAIN_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
      };
      const response = await fetch(
        ALPHA_BASE_URL + "/repurchase/" + paramOrderCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: ORDER_CONST.ON_BUY_ORDER_AGAIN_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ORDER_CONST.ON_BUY_ORDER_AGAIN_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
