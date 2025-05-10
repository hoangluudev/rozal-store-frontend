import { USER_CONST } from "../../constants";
import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/auth/users";
const USER_URL = SERVER_URL + "/users";
const USER_URL_ALPHA = SERVER_URL + "/user";
const OTP_AUTH_URL = SERVER_URL + "/otp-auth";

export const fetchUserByAccessToken = () => {
  return async (dispatch) => {
    const accessToken = getAccessToken();
    let requestData = {
      accessToken: accessToken,
    };
    try {
      dispatch({ type: USER_CONST.FETCH_LOGGED_USER_PENDING });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      const response = await fetch(BASE_URL + "/fetch-user", requestOptions);

      if (response.status === 401) {
        dispatch({ type: USER_CONST.FETCH_LOGGED_USER_ERROR, isRefresh: true });
      } else {
        const userData = await response.json();
        const user = userData.data;
        dispatch({
          type: USER_CONST.FETCH_LOGGED_USER_SUCCESS,
          data: user,
        });
      }
    } catch (error) {
      dispatch({ type: USER_CONST.FETCH_LOGGED_USER_ERROR });
    }
  };
};
export const fetchUserOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_CONST.FETCH_USER_ORDER_PENDING });
      const accessToken = getAccessToken();

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(USER_URL + "/order-history", requestOptions);

      if (!response.ok) {
        throw new Error("Failed to get user order! Status: " + response.status);
      }

      const dataObj = await response.json();
      const data = dataObj.data;

      dispatch({
        type: USER_CONST.FETCH_USER_ORDER_SUCCESS,
        data: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CONST.FETCH_USER_ORDER_ERROR,
        error: error.message,
      });
    }
  };
};
export const updateUserInfo = (userData) => {
  const requestDataObj = userData;
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: USER_CONST.UPDATE_USER_INFO_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: USER_CONST.UPDATE_USER_INFO_PENDING });

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(USER_URL + "/update-info", requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user.");
      }

      const dataObj = await response.json();
      const user = dataObj.data;
      dispatch({
        type: USER_CONST.UPDATE_USER_INFO_SUCCESS,
        data: user,
        successMessage: dataObj.message,
      });
    } catch (error) {
      await dispatch({
        type: USER_CONST.UPDATE_USER_INFO_ERROR,
        errorMessage: error.message,
      });
    }
  };
};

export const fetchUserAddress = () => {
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
        type: USER_CONST.FETCH_USER_ADDRESS_PENDING,
      });

      const response = await fetch(USER_URL_ALPHA + "/address", requestOptions);

      const data = await response.json();

      return dispatch({
        type: USER_CONST.FETCH_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: USER_CONST.FETCH_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createUserAddress = (requestData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_CONST.CREATE_USER_ADDRESS_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(USER_URL_ALPHA + "/address", requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: USER_CONST.CREATE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: USER_CONST.CREATE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateUserAddress = (requestData, paramId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_CONST.UPDATE_USER_ADDRESS_PENDING });

      const accesstoken = getAccessToken();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accesstoken,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        USER_URL_ALPHA + "/address/id/" + paramId,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: USER_CONST.UPDATE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: USER_CONST.UPDATE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteUserAddress = (paramId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_CONST.DELETE_USER_ADDRESS_PENDING });
      const accessToken = getAccessToken();

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        USER_URL_ALPHA + "/address/id/" + paramId,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      dispatch({
        type: USER_CONST.DELETE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: USER_CONST.DELETE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const changePasswordRequestOTP = (newPassword, confirmPassword) => {
  return async (dispatch) => {
    try {
      const requestObj = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      dispatch({ type: USER_CONST.CREATE_OTP_REQUEST_CHANGE_PASSWORD_PENDING });
      const accessToken = getAccessToken();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestObj),
      };
      const response = await fetch(
        OTP_AUTH_URL + "/send-email-code",
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send OTP request.");
      }

      const dataObj = await response.json();

      dispatch({
        type: USER_CONST.CREATE_OTP_REQUEST_CHANGE_PASSWORD_SUCCESS,
        payload: dataObj,
        successMessage: dataObj.message,
      });
    } catch (error) {
      await dispatch({
        type: USER_CONST.CREATE_OTP_REQUEST_CHANGE_PASSWORD_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
export const verifyOTPChangePassword = (newPassword, otpCode) => {
  return async (dispatch) => {
    try {
      const requestObj = {
        newPassword: newPassword,
        otpCode: otpCode,
      };
      dispatch({ type: USER_CONST.CHANGE_USER_PASSWORD_PENDING });
      const accessToken = getAccessToken();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestObj),
      };
      const response = await fetch(
        OTP_AUTH_URL + "/change-password",
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify OTP code.");
      }

      const dataObj = await response.json();

      dispatch({
        type: USER_CONST.CHANGE_USER_PASSWORD_SUCCESS,
        successMessage: dataObj.message,
        isSuccess: true,
      });
    } catch (error) {
      await dispatch({
        type: USER_CONST.CHANGE_USER_PASSWORD_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
