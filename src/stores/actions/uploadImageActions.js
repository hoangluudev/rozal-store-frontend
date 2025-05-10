import axios from "axios";
import { getAccessToken } from "../../services/tokenService";
import getServerURL from "../../config/ipconfig";
import { UPLOAD_IMAGE_CONST } from "../constants";

const SERVER_URL = getServerURL();
const BASE_URL = SERVER_URL + "/images";

export const uploadSingleImage = (uploadedImage, folder) => {
  return async (dispatch) => {
    try {
      const accesstoken = getAccessToken();
      dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_PENDING,
      });

      const formData = new FormData();
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
      if (folder) {
        formData.append("folder", folder);
      }

      const requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": accesstoken,
        },
      };
      const response = await axios.post(
        BASE_URL + "/upload/single",
        formData,
        requestOptions
      );

      dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_SUCCESS,
        payload: {
          data: response,
          message: response.data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_ERROR,
        payload: { message: error.response.data.message },
      });
    }
  };
};
export const uploadMultipleImages = (uploadedImages, folder) => {
  return async (dispatch) => {
    try {
      const accesstoken = getAccessToken();
      dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_PENDING,
      });

      const formData = new FormData();
      if (uploadedImages && Array.isArray(uploadedImages)) {
        uploadedImages.forEach((image) => {
          formData.append("images", image);
        });
      }
      if (folder) {
        formData.append("folder", folder);
      }

      const requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": accesstoken,
        },
      };
      const response = await axios.post(
        BASE_URL + "/upload/multiple",
        formData,
        requestOptions
      );

      dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_SUCCESS,
        payload: {
          data: response,
          message: response.data.message || "No messages",
        },
      });
    } catch (error) {
      await dispatch({
        type: UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_ERROR,
        payload: { message: error.response.data.message },
      });
    }
  };
};
