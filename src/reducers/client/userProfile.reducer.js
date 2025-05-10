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
  FETCH_USER_ORDER_PENDING,
  FETCH_USER_ORDER_SUCCESS,
  FETCH_USER_ORDER_ERROR,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_PENDING,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_SUCCESS,
  CREATE_OTP_REQUEST_CHANGE_PASSWORD_ERROR,
  CHANGE_USER_PASSWORD_PENDING,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from "../../constants/user.constant";

const initialState = {
  getUserPending: false,
  updateUserInfoPending: false,
  fetchUserAddressPending: false,
  createUserAddressPending: false,
  updateUserAddressPending: false,
  deleteUserAddressPending: false,
  getUserOrderPending: false,
  requestChangePasswordPending: false,
  verifyOTPChangePasswordPending: false,

  createUserAddressSuccess: false,
  updateUserAddressSuccess: false,
  deleteUserAddressSuccess: false,

  updateUserInfoResponse: null,
  requestChangePasswordResponse: null,

  userAddressData: [],
  userDefaultAddressData: {},
  isRefresh: false,
  currentUserData: null,
  currentUserRole: null,
  currentUserAddress: [],
  isAdminRole: false,
  isVerifyOTPChangePasswordValid: false,

  currentUserOrders: [],
};

const USER_PROFILE_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGGED_USER_PENDING:
      state.getUserPending = true;
      state.currentUserData = null;
      state.currentUserAddress = [];
      state.isRefresh = false;
      break;
    case FETCH_LOGGED_USER_SUCCESS:
      state.getUserPending = false;
      state.isRefresh = false;
      state.currentUserData = action.data;
      state.currentUserRole = state.currentUserData.role.name;
      state.isAdminRole =
        state.currentUserRole === "admin" || state.currentUserRole === "manager"
          ? true
          : false;
      state.currentUserAddress = state.currentUserData.addresses;
      break;
    case FETCH_LOGGED_USER_ERROR:
      state.getUserPending = false;
      state.isRefresh = action.isRefresh;
      break;
    case UPDATE_USER_INFO_PENDING:
      state.updateUserInfoPending = true;
      break;
    case UPDATE_USER_INFO_SUCCESS:
      state.updateUserInfoPending = false;
      state.updateUserInfoResponse = action.data;
      break;
    case UPDATE_USER_INFO_ERROR:
      state.updateUserInfoPending = false;
      break;
    case CREATE_USER_ADDRESS_PENDING:
      state.createUserAddressPending = true;
      state.createUserAddressSuccess = false;
      break;
    case CREATE_USER_ADDRESS_SUCCESS:
      state.createUserAddressPending = false;
      state.createUserAddressSuccess = true;
      break;
    case CREATE_USER_ADDRESS_ERROR:
      state.createUserAddressPending = false;
      state.createUserAddressSuccess = false;
      break;
    case FETCH_USER_ADDRESS_PENDING:
      state.fetchUserAddressPending = true;
      state.createUserAddressSuccess = false;
      state.updateUserAddressSuccess = false;
      state.deleteUserAddressSuccess = false;
      break;
    case FETCH_USER_ADDRESS_SUCCESS:
      state.fetchUserAddressPending = false;
      {
        let dataObj = action.payload.data;

        state.userAddressData = dataObj.data;
        state.userDefaultAddressData = dataObj.userDefaultAddress;
      }
      break;
    case FETCH_USER_ADDRESS_ERROR:
      state.fetchUserAddressPending = false;
      break;
    case UPDATE_USER_ADDRESS_PENDING:
      state.updateUserAddressPending = true;
      state.updateUserAddressSuccess = false;
      break;
    case UPDATE_USER_ADDRESS_SUCCESS:
      state.updateUserAddressPending = false;
      state.updateUserAddressSuccess = true;
      break;
    case UPDATE_USER_ADDRESS_ERROR:
      state.updateUserAddressPending = false;
      state.updateUserAddressSuccess = false;
      break;
    case DELETE_USER_ADDRESS_PENDING:
      state.deleteUserAddressPending = true;
      state.deleteUserAddressSuccess = false;
      break;
    case DELETE_USER_ADDRESS_SUCCESS:
      state.deleteUserAddressPending = false;
      state.deleteUserAddressSuccess = true;
      break;
    case DELETE_USER_ADDRESS_ERROR:
      state.deleteUserAddressPending = false;
      state.deleteUserAddressSuccess = false;
      break;
    case FETCH_USER_ORDER_PENDING:
      state.getUserOrderPending = true;
      break;
    case FETCH_USER_ORDER_SUCCESS:
      state.getUserOrderPending = false;
      state.currentUserOrders = action.data;
      break;
    case FETCH_USER_ORDER_ERROR:
      state.getUserOrderPending = false;
      break;
    case CREATE_OTP_REQUEST_CHANGE_PASSWORD_PENDING:
      state.requestChangePasswordPending = true;
      break;
    case CREATE_OTP_REQUEST_CHANGE_PASSWORD_SUCCESS:
      state.requestChangePasswordPending = false;
      state.requestChangePasswordResponse = action.payload;
      state.isVerifyOTPChangePasswordValid = false;
      break;
    case CREATE_OTP_REQUEST_CHANGE_PASSWORD_ERROR:
      state.requestChangePasswordPending = false;
      break;
    case CHANGE_USER_PASSWORD_PENDING:
      state.verifyOTPChangePasswordPending = true;
      break;
    case CHANGE_USER_PASSWORD_SUCCESS:
      state.verifyOTPChangePasswordPending = false;
      state.requestChangePasswordResponse = null;
      state.isVerifyOTPChangePasswordValid = action.isSuccess;
      break;
    case CHANGE_USER_PASSWORD_ERROR:
      state.verifyOTPChangePasswordPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default USER_PROFILE_REDUCERS;
