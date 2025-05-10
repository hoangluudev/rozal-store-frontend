import getServerURL from "../../config/ipconfig";
import { USER_AUTH_CONST } from "../constants";
import axios from "axios";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/auth/users";

export const onUserSignUp = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_PENDING });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(BASE_URL + "/signup", requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up new account.");
      }
      const data = await response.json();
      dispatch({
        type: USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
export const onUserSignIn = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_PENDING });

      const requestOptions = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BASE_URL + "/signin",
        userData,
        requestOptions
      );

      dispatch({
        type: USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_SUCCESS,
        payload: {
          data: response,
          message: response.data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_ERROR,
        payload: { message: error.response.data.message },
      });
    }
  };
};
export const onUserLogout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_PENDING });

      const requestOptions = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BASE_URL + "/logout",
        {},
        requestOptions
      );

      dispatch({
        type: USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_SUCCESS,
        payload: {
          data: response,
          message: response.data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_ERROR,
        payload: { message: error.response.data.message },
      });
    }
  };
};
export const onFetchRefreshToken = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_PENDING });

      const requestOptions = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BASE_URL + "/refresh-token",
        {},
        requestOptions
      );

      dispatch({
        type: USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_SUCCESS,
        payload: {
          data: response,
          message: response.data.message || "No messages",
        },
      });
    } catch (error) {
      console.log(error);
      await dispatch({
        type: USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_ERROR,
        payload: { message: error.response.data.message },
      });
    }
  };
};
