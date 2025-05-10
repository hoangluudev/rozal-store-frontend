import getServerURL from "../../config/ipconfig";
import {
  FETCH_ORDER_CHECKOUT_INFO_PENDING,
  FETCH_ORDER_CHECKOUT_INFO_SUCCESS,
  FETCH_ORDER_CHECKOUT_INFO_ERROR,
  CREATE_ORDER_PENDING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  FETCH_ORDER_BY_CODE_PENDING,
  FETCH_ORDER_BY_CODE_SUCCESS,
  FETCH_ORDER_BY_CODE_ERROR,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS,
  FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR,
  FETCH_USER_ORDER_HISTORY_PENDING,
  FETCH_USER_ORDER_HISTORY_SUCCESS,
  FETCH_USER_ORDER_HISTORY_ERROR,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS,
  CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR,
  CREATE_ORDER_CANCELLATION_REQUEST_PENDING,
  CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS,
  CREATE_ORDER_CANCELLATION_REQUEST_ERROR,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS,
  UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
  UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR,
  ON_BUY_ORDER_AGAIN_PENDING,
  ON_BUY_ORDER_AGAIN_SUCCESS,
  ON_BUY_ORDER_AGAIN_ERROR,
} from "../../constants/client/order.constant";
import { getAccessToken } from "../../services/tokenService";

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
        type: FETCH_ORDER_CHECKOUT_INFO_PENDING,
      });
      const response = await fetch(
        ALPHA_BASE_URL + "/checkout-info" + filterParams,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_ORDER_CHECKOUT_INFO_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ORDER_CHECKOUT_INFO_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createOrder = (requestData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_PENDING });

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
        type: CREATE_ORDER_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: CREATE_ORDER_ERROR,
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
        type: FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_PENDING,
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
        type: FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_CHECKOUT_ORDER_STATUS_BY_CODE_ERROR,
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
        type: FETCH_USER_ORDER_HISTORY_PENDING,
      });
      const response = await fetch(
        ALPHA_BASE_URL + "/history" + queryParams,
        requestOptions
      );

      const data = await response.json();

      return dispatch({
        type: FETCH_USER_ORDER_HISTORY_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_USER_ORDER_HISTORY_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const cancelOrderbyOrderCode = (requestData, paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_CANCELLATION_REQUEST_PENDING });

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
        type: CREATE_ORDER_CANCELLATION_REQUEST_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: CREATE_ORDER_CANCELLATION_REQUEST_ERROR,
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
        type: FETCH_ORDER_BY_CODE_PENDING,
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
        type: FETCH_ORDER_BY_CODE_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ORDER_BY_CODE_ERROR,
        payload: { message: error.message },
      });
    }
  };
};

export const createZaloPaymentRetryRequest = (paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_ZALO_RETRY_PAYMENT_REQUEST_PENDING });

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
        type: CREATE_ZALO_RETRY_PAYMENT_REQUEST_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: CREATE_ZALO_RETRY_PAYMENT_REQUEST_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateOrderPaymentMethod = (requestData, paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_PENDING });

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
        type: UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_ORDER_CUSTOMER_PAYMENT_METHOD_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateOrderDeliveryAddress = (
  requestData,
  paramOrderCode
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_PENDING });

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
        type: UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_ORDER_CUSTOMER_DELIVERY_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const onRepurchaseOrder = (paramOrderCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ON_BUY_ORDER_AGAIN_PENDING });

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
        type: ON_BUY_ORDER_AGAIN_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: ON_BUY_ORDER_AGAIN_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
