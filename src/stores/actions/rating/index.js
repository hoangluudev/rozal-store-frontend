import { getAccessToken } from "../../../services/tokenService";
import getServerURL from "../../../config/ipconfig";
import { RATING_CONST } from "../../constants";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/rating/product";

export const createProductRating = (requestData, paramProductCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: RATING_CONST.CREATE_PRODUCT_RATING_PENDING });

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
        BASE_URL + "/" + paramProductCode,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return dispatch({
        type: RATING_CONST.CREATE_PRODUCT_RATING_SUCCESS,
        payload: {
          data,
          message: data.message || "No messages",
        },
      });
    } catch (error) {
      return dispatch({
        type: RATING_CONST.CREATE_PRODUCT_RATING_ERROR,
        payload: { message: error.message },
      });
    }
  };
};
