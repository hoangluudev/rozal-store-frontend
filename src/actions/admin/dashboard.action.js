import {
  FETCH_ORDER_DASHBOARD_PENDING,
  FETCH_ORDER_DASHBOARD_SUCCESS,
  FETCH_ORDER_DASHBOARD_ERROR,
} from "../../constants/admin/dashboard.constant";
import { getAccessToken } from "../../services/tokenService";

import getServerURL from "../../config/ipconfig";
const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/dashboard";

export const fetchDashboardStatistics = () => {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          "x-access-token": accessToken,
        },
      };

      await dispatch({
        type: FETCH_ORDER_DASHBOARD_PENDING,
      });
      const response = await fetch(BASE_URL, requestOptions);

      const dataObj = await response.json();

      return dispatch({
        type: FETCH_ORDER_DASHBOARD_SUCCESS,
        payload: dataObj,
      });
    } catch (error) {
      return dispatch({
        type: FETCH_ORDER_DASHBOARD_ERROR,
        error: error.message,
      });
    }
  };
};
