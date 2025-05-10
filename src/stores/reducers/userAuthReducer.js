import { USER_AUTH_CONST } from "../constants";
import {
  removeAccessToken,
  setAccessToken,
  setAccessToken_ExpTime,
} from "../../services/tokenService";

const initialState = {
  signUpPending: false,
  loginPending: false,
  userLogoutPending: false,
  refreshTokenPending: false,

  userSignUpResponse: null,
  userLoginRespone: null,
  userLogoutRespone: null,

  isRefreshTokenExpired: false,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_PENDING:
      state.signUpPending = true;
      break;
    case USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_SUCCESS:
      state.signUpPending = false;
      {
        let dataObj = action.payload.data;
        state.userSignUpResponse = dataObj.data;
      }
      window.location.href = "/login";
      break;
    case USER_AUTH_CONST.CREATE_USER_SIGNUP_REQUEST_ERROR:
      state.signUpPending = false;
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_PENDING:
      state.loginPending = true;
      state.userLoginRespone = null;
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_SUCCESS:
      state.loginPending = false;
      {
        let dataObj = action.payload.data;
        state.userLoginRespone = dataObj.data;
        setAccessToken(state.userLoginRespone.accessToken);
        setAccessToken_ExpTime(state.userLoginRespone.sessionid_exp);
      }
      window.location.reload();
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGIN_REQUEST_ERROR:
      state.loginPending = false;
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_PENDING:
      state.userLogoutPending = true;
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_SUCCESS:
      state.userLogoutPending = false;
      {
        let dataObj = action.payload.data;
        state.userLogoutRespone = dataObj.data;
      }
      window.location.reload();
      break;
    case USER_AUTH_CONST.CREATE_USER_LOGOUT_REQUEST_ERROR:
      state.userLogoutPending = false;
      break;
    case USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_PENDING:
      state.refreshTokenPending = true;
      state.userLoginRespone = null;
      break;
    case USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_SUCCESS:
      state.refreshTokenPending = false;
      {
        let dataObj = action.payload.data;
        state.userLoginRespone = dataObj.data;
        setAccessToken(state.userLoginRespone.accessToken);
        setAccessToken_ExpTime(state.userLoginRespone.sessionid_exp);
      }
      window.location.reload();
      break;
    case USER_AUTH_CONST.CREATE_REFRESH_TOKEN_REQUEST_ERROR:
      state.refreshTokenPending = false;
      removeAccessToken();
      window.location.reload();
      break;
    default:
      break;
  }

  return { ...state };
};

export default userAuthReducer;
