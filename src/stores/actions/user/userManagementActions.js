import { USER_MANAGEMENT_CONST } from "../../constants";
import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";
const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/users";

const ERROR_MESSAGES = {
  emptyField: "Please enter all required information!",
  invalidUserName: "Username must be at least 8 characters!",
  usernameTooLong: "Username too long! Max 20 characters",
  invalidFullName: "Full Name must be at least 8 characters!",
  fullNameTooLong: "Full Name too long! Max 20 characters",
  invalidUserName2: "Username must not contains white-spaces!",
  invalidEmail: "Email is invalid!",
  invalidPhone: "Phone number is invalid!",
  invalidPassword:
    "Invalid password!! Must at least 8 characters, 1 uppercase letter and number(0-9).",
  invalidBirthDate: "Must be over 18 years old!",
  accountExisted: "Account username or email is already existed!",
};
const STATUS_MESSAGES = {
  signUpError: "An error occurred while creating a new account!!",
  expiredRefreshToken: "Your session has expired. Please log in.",
  internalServerError: "Oops! Something went wrong. Please try again later.",
};

export const fetchClients = (currentPage, itemPerPage) => {
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
        type: USER_MANAGEMENT_CONST.FETCH_CUSTOMER_PENDING,
      });
      const response = await fetch(
        BASE_URL + "/clients?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: USER_MANAGEMENT_CONST.FETCH_CUSTOMER_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        limit: dataObj.limit,
        currentPage: dataObj.currentPage,
      });
    } catch (error) {
      return dispatch({
        type: USER_MANAGEMENT_CONST.FETCH_CUSTOMER_ERROR,
        error: error,
      });
    }
  };
};
export const createCustomer = (userData) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_PENDING });
      const errorMessages = checkIfValidCustomerForm(userData, ERROR_MESSAGES);
      if (errorMessages) {
        return dispatch({
          type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR,
          invalidMessage: errorMessages,
        });
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(userData),
      };

      const response = await fetch(BASE_URL + "/new-client", requestOptions);
      if (response.status === 422) {
        return await dispatch({
          type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR,
          errorMessage: ERROR_MESSAGES.accountExisted,
        });
      }
      if (!response.ok) {
        return await dispatch({
          type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR,
          errorMessage: STATUS_MESSAGES.signUpError,
        });
      }

      const data = await response.json();
      dispatch({
        type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_SUCCESS,
        data: data,
      });
    } catch (error) {
      await dispatch({
        type: USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR,
        errorMessage: STATUS_MESSAGES.signUpError,
      });
    }
  };
};
export const updateUserByID = (userData, userId) => {
  const requestDataObj = userData;
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_PENDING });

      if (requestDataObj.email) {
        const isEmailValid = isValidEmail(requestDataObj.email);
        if (!isEmailValid) {
          return await dispatch({
            type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_ERROR,
            invalidMessage: ERROR_MESSAGES.invalidEmail,
          });
        }
      }
      if (requestDataObj.phone) {
        const isPhoneValid = isValidPhone(requestDataObj.phone);
        if (!isPhoneValid) {
          return await dispatch({
            type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_ERROR,
            invalidMessage: ERROR_MESSAGES.invalidPhone,
          });
        }
      }
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(BASE_URL + "/" + userId, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      const userData = await response.json();
      const user = userData.data;
      dispatch({
        type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_SUCCESS,
        data: user,
      });
    } catch (error) {
      await dispatch({
        type: USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_ERROR,
        errorMessage: STATUS_MESSAGES.internalServerError,
      });
    }
  };
};
export const deleteUserByID = (userID) => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await fetch(
        BASE_URL + "/delete-user/" + userID,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      dispatch({ type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_SUCCESS });
    } catch (error) {
      await dispatch({
        type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_ERROR,
        errorMessage: STATUS_MESSAGES.internalServerError,
      });
    }
  };
};
export const deleteMultipleUserByID = (paramUserIDs) => {
  const requestDataObj = {
    userIdList: paramUserIDs,
  };
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return dispatch({
          type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_ERROR,
          error: "Access token is missing",
        });
      }
      dispatch({ type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_PENDING });

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(requestDataObj),
      };

      const response = await fetch(
        BASE_URL + "/delete-multiple-user",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      dispatch({ type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_SUCCESS });
    } catch (error) {
      await dispatch({
        type: USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_ERROR,
        errorMessage: STATUS_MESSAGES.internalServerError,
      });
    }
  };
};

export const getSelectedIDs = (userIDs) => ({
  type: USER_MANAGEMENT_CONST.GET_SELECTED_IDS,
  payload: userIDs,
});

export const onCustomerSearch = (currentPage, itemPerPage, searchText) => {
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
        type: USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_PENDING,
      });

      const response = await fetch(
        BASE_URL + "/search-client?" + vQueryParams.toString(),
        requestOptions
      );

      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isSearch: dataObj.isSearching,
        searchValue: searchText,
      });
    } catch (error) {
      return dispatch({
        type: USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_ERROR,
        error: error,
      });
    }
  };
};
export const onCustomerFilter = (currentPage, itemPerPage, filterValue) => {
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
      if (filterValue.gender) {
        vQueryParams.append("gender", filterValue.gender);
      }
      if (filterValue.joinDate) {
        vQueryParams.append("joinDate", filterValue.joinDate);
      }
      await dispatch({
        type: USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_PENDING,
      });
      const response = await fetch(
        BASE_URL + "/filter-client?" + vQueryParams.toString(),
        requestOptions
      );
      const dataObj = await response.json();
      const data = dataObj.data;
      return dispatch({
        type: USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_SUCCESS,
        data: data,
        totalCount: dataObj.totalItems,
        currentPage: dataObj.currentPage,
        limit: dataObj.limit,
        isFilterOn: dataObj.isFilterApplied,
        filterValue: filterValue,
      });
    } catch (error) {
      return dispatch({
        type: USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_ERROR,
        error: error,
      });
    }
  };
};
export const onSearchedCustomerPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { searchValue } = getState().USERS_ADMIN_REDUCERS;
    dispatch(onCustomerSearch(currentPage, itemPerPage, searchValue));
  };
};
export const onFilteredCustomerPageChange = (currentPage, itemPerPage) => {
  return async (dispatch, getState) => {
    const { filterValue } = getState().USERS_ADMIN_REDUCERS;
    dispatch(onCustomerFilter(currentPage, itemPerPage, filterValue));
  };
};

const checkIfValidCustomerForm = (paramData, messages) => {
  if (
    isEmptyObject(paramData) ||
    !paramData.username ||
    !paramData.fullName ||
    !paramData.email ||
    !paramData.password ||
    !paramData.phone
  ) {
    return messages.emptyField;
  }
  if (paramData.username.length < 8) {
    return messages.invalidUserName;
  }
  if (paramData.username.length > 20) {
    return messages.usernameTooLong;
  }
  if (paramData.fullName.length < 8) {
    return messages.invalidFullName;
  }
  if (paramData.fullName.length > 20) {
    return messages.invalidFullName;
  }
  if (paramData.username.includes(" ")) {
    return messages.invalidUserName2;
  }
  if (!isValidEmail(paramData.email)) {
    return messages.invalidEmail;
  }
  if (!isValidPassword(paramData.password)) {
    return messages.invalidPassword;
  }
  if (!isValidPhone(paramData.phone)) {
    return messages.invalidPhone;
  }
  if (paramData.birthDate && !isValidBirthDate(paramData.birthDate)) {
    return messages.invalidBirthDate;
  }
  return null;
};
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const isValidPhone = (number) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
};
const isValidBirthDate = (birthDate) => {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const birthday = new Date(birthDate);
  return birthday <= eighteenYearsAgo;
};
const isEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
