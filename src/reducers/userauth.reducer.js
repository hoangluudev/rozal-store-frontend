import {
  CREATE_USER_SIGNUP_REQUEST_PENDING,
  CREATE_USER_SIGNUP_REQUEST_SUCCESS,
  CREATE_USER_SIGNUP_REQUEST_ERROR,
  CREATE_USER_LOGIN_REQUEST_PENDING,
  CREATE_USER_LOGIN_REQUEST_SUCCESS,
  CREATE_USER_LOGIN_REQUEST_ERROR,
  CREATE_USER_LOGOUT_REQUEST_PENDING,
  CREATE_USER_LOGOUT_REQUEST_SUCCESS,
  CREATE_USER_LOGOUT_REQUEST_ERROR,
  CREATE_REFRESH_TOKEN_REQUEST_PENDING,
  CREATE_REFRESH_TOKEN_REQUEST_SUCCESS,
  CREATE_REFRESH_TOKEN_REQUEST_ERROR,
} from "../constants/userAuth.constant";
import {
  removeAccessToken,
  setAccessToken,
  setAccessToken_ExpTime,
} from "../services/tokenService";

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

const USER_AUTH_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SIGNUP_REQUEST_PENDING:
      state.signUpPending = true;
      break;
    case CREATE_USER_SIGNUP_REQUEST_SUCCESS:
      state.signUpPending = false;
      {
        let dataObj = action.payload.data;
        state.userSignUpResponse = dataObj.data;
      }
      window.location.href = "/login";
      break;
    case CREATE_USER_SIGNUP_REQUEST_ERROR:
      state.signUpPending = false;
      break;
    case CREATE_USER_LOGIN_REQUEST_PENDING:
      state.loginPending = true;
      state.userLoginRespone = null;
      break;
    case CREATE_USER_LOGIN_REQUEST_SUCCESS:
      state.loginPending = false;
      {
        let dataObj = action.payload.data;
        state.userLoginRespone = dataObj.data;
        setAccessToken(state.userLoginRespone.accessToken);
        setAccessToken_ExpTime(state.userLoginRespone.sessionid_exp);
      }
      window.location.reload();
      break;
    case CREATE_USER_LOGIN_REQUEST_ERROR:
      state.loginPending = false;
      break;
    case CREATE_USER_LOGOUT_REQUEST_PENDING:
      state.userLogoutPending = true;
      break;
    case CREATE_USER_LOGOUT_REQUEST_SUCCESS:
      state.userLogoutPending = false;
      {
        let dataObj = action.payload.data;
        state.userLogoutRespone = dataObj.data;
      }
      window.location.reload();
      break;
    case CREATE_USER_LOGOUT_REQUEST_ERROR:
      state.userLogoutPending = false;
      break;
    case CREATE_REFRESH_TOKEN_REQUEST_PENDING:
      state.refreshTokenPending = true;
      state.userLoginRespone = null;
      break;
    case CREATE_REFRESH_TOKEN_REQUEST_SUCCESS:
      state.refreshTokenPending = false;
      {
        let dataObj = action.payload.data;
        state.userLoginRespone = dataObj.data;
        setAccessToken(state.userLoginRespone.accessToken);
        setAccessToken_ExpTime(state.userLoginRespone.sessionid_exp);
      }
      window.location.reload();
      break;
    case CREATE_REFRESH_TOKEN_REQUEST_ERROR:
      state.refreshTokenPending = false;
      removeAccessToken();
      window.location.reload();
      break;
    default:
      break;
  }

  return { ...state };
};

export default USER_AUTH_REDUCERS;
