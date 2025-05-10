import { UPLOAD_IMAGE_CONST } from "../constants";

const initialState = {
  uploadImagePending: false,
  uploadSingleImageSuccess: false,

  uploadMultipleImagePending: false,
  uploadMultipleImageSuccess: false,

  imageUrl: null,
  imageUrls: [],
};
const uploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_PENDING:
      state.uploadImagePending = true;
      state.uploadSingleImageSuccess = false;
      state.imageUrl = null;
      break;
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_SUCCESS:
      state.uploadImagePending = false;
      state.uploadSingleImageSuccess = true;
      {
        let dataObj = action.payload.data;

        state.imageUrl = dataObj.data.data;
      }
      break;
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_SINGLE_IMAGE_REQUEST_ERROR:
      state.uploadImagePending = false;
      state.uploadSingleImageSuccess = false;
      state.imageUrl = null;
      break;
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_PENDING:
      state.uploadMultipleImagePending = true;
      state.uploadMultipleImageSuccess = false;
      state.imageUrls = [];
      break;
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_SUCCESS:
      state.uploadMultipleImagePending = false;
      state.uploadMultipleImageSuccess = true;
      {
        let dataObj = action.payload.data;
        state.imageUrls = dataObj.data.data;
      }
      break;
    case UPLOAD_IMAGE_CONST.CREATE_UPLOAD_MULTIPLE_IMAGES_REQUEST_ERROR:
      state.uploadMultipleImagePending = false;
      state.uploadMultipleImageSuccess = false;
      state.imageUrls = [];
      break;
    default:
      break;
  }

  return { ...state };
};
export default uploadImageReducer;
