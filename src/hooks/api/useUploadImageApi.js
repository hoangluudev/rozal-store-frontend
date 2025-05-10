import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../../stores/actions/uploadImageActions";

const useUploadImageApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userManagementReducer);

  const uploadSingleImageCb = useCallback(
    (uploadedImage, folder) => {
      dispatch(uploadSingleImage(uploadedImage, folder));
    },
    [dispatch]
  );

  const uploadMultipleImagesCb = useCallback(
    (uploadedImage, folder) => {
      dispatch(uploadMultipleImages(uploadedImage, folder));
    },
    [dispatch]
  );

  return {
    state,
    uploadSingleImage: uploadSingleImageCb,
    uploadMultipleImages: uploadMultipleImagesCb,
  };
};

export default useUploadImageApi;
