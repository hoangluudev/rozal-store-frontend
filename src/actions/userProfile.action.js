import getServerURL from "../config/ipconfig";
import {
  FETCH_LOGGED_USER_PENDING,
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_LOGGED_USER_ERROR,
  UPDATE_USER_INFO_PENDING,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
  CREATE_USER_ADDRESS_PENDING,
  CREATE_USER_ADDRESS_SUCCESS,
  CREATE_USER_ADDRESS_ERROR,
  FETCH_USER_ADDRESS_PENDING,
  FETCH_USER_ADDRESS_SUCCESS,
  FETCH_USER_ADDRESS_ERROR,
  UPDATE_USER_ADDRESS_PENDING,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_ERROR,
  DELETE_USER_ADDRESS_PENDING,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_ERROR,
  FETCH_CITY_NAME_PENDING,
  FETCH_CITY_NAME_SUCCESS,
  FETCH_CITY_NAME_ERROR,
  FETCH_DISTRICT_NAME_PENDING,
  FETCH_DISTRICT_NAME_SUCCESS,
  FETCH_DISTRICT_NAME_ERROR,
  FETCH_WARD_NAME_PENDING,
  FETCH_WARD_NAME_SUCCESS,
  FETCH_WARD_NAME_ERROR,
  FETCH_USER_ORDER_PENDING,
  FETCH_USER_ORDER_SUCCESS,
  FETCH_USER_ORDER_ERROR,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_PENDING,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_SUCCESS,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_ERROR,
  CHANGE_USER_PASSWORD_PENDING,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from "../constants/user.constant";
import { getAccessToken } from "../services/tokenService";

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
      dispatch({ type: FETCH_LOGGED_USER_PENDING });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      const response = await fetch(BASE_URL + "/fetch-user", requestOptions);

      if (response.status === 401) {
        dispatch({ type: FETCH_LOGGED_USER_ERROR, isRefresh: true });
      } else {
        const userData = await response.json();
        const user = userData.data;
        dispatch({
          type: FETCH_LOGGED_USER_SUCCESS,
          data: user,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_LOGGED_USER_ERROR });
    }
  };
};
export const fetchUserOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_USER_ORDER_PENDING });
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
        type: FETCH_USER_ORDER_SUCCESS,
        data: data,
      });
    } catch (error) {
      dispatch({ type: FETCH_USER_ORDER_ERROR, error: error.message });
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
          type: UPDATE_USER_INFO_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: UPDATE_USER_INFO_PENDING });

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
        type: UPDATE_USER_INFO_SUCCESS,
        data: user,
        successMessage: dataObj.message,
      });
    } catch (error) {
      await dispatch({
        type: UPDATE_USER_INFO_ERROR,
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
        type: FETCH_USER_ADDRESS_PENDING,
      });

      const response = await fetch(USER_URL_ALPHA + "/address", requestOptions);

      const data = await response.json();

      return dispatch({
        type: FETCH_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: FETCH_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const createUserAddress = (requestData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_USER_ADDRESS_PENDING });

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
        type: CREATE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: CREATE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const updateUserAddress = (requestData, paramId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_ADDRESS_PENDING });

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
        type: UPDATE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const deleteUserAddress = (paramId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_ADDRESS_PENDING });
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
        type: DELETE_USER_ADDRESS_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: DELETE_USER_ADDRESS_ERROR,
        payload: { message: error.message },
      });
    }
  };
};

export const fetchCity = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_CITY_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/",
        requestOptions
      );

      const cityData = await response.json();

      dispatch({ type: FETCH_CITY_NAME_SUCCESS, data: cityData });
    } catch (error) {
      dispatch({ type: FETCH_CITY_NAME_ERROR });
    }
  };
};
export const fetchDistrict = (paramProvinceData) => {
  return async (dispatch) => {
    try {
      const gProvinceID = paramProvinceData.province_id;
      dispatch({ type: FETCH_DISTRICT_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/district/" + gProvinceID,
        requestOptions
      );

      const districtData = await response.json();

      dispatch({ type: FETCH_DISTRICT_NAME_SUCCESS, data: districtData });
    } catch (error) {
      dispatch({ type: FETCH_DISTRICT_NAME_ERROR });
    }
  };
};
export const fetchWard = (paramDistrictData) => {
  return async (dispatch) => {
    try {
      const gDistrictID = paramDistrictData.district_id;
      dispatch({ type: FETCH_WARD_NAME_PENDING });
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/ward/" + gDistrictID,
        requestOptions
      );

      const districtData = await response.json();

      dispatch({ type: FETCH_WARD_NAME_SUCCESS, data: districtData });
    } catch (error) {
      dispatch({ type: FETCH_WARD_NAME_ERROR });
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
      dispatch({ type: CREATE_OTP_REQUEST_CHANGE_PASSWORD_PENDING });
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
        type: CREATE_OTP_REQUEST_CHANGE_PASSWORD_SUCCESS,
        payload: dataObj,
        successMessage: dataObj.message,
      });
    } catch (error) {
      await dispatch({
        type: CREATE_OTP_REQUEST_CHANGE_PASSWORD_ERROR,
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
      dispatch({ type: CHANGE_USER_PASSWORD_PENDING });
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
        type: CHANGE_USER_PASSWORD_SUCCESS,
        successMessage: dataObj.message,
        isSuccess: true,
      });
    } catch (error) {
      await dispatch({
        type: CHANGE_USER_PASSWORD_ERROR,
        errorMessage: error.message,
      });
    }
  };
};
