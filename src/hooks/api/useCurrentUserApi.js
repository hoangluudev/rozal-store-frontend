import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByAccessToken,
  fetchUserOrder,
  fetchUserAddress,
  updateUserInfo,
  updateUserAddress,
  createUserAddress,
  changePasswordRequestOTP,
  verifyOTPChangePassword,
  deleteUserAddress,
} from "../../stores/actions/user/currentUserActions";

const useCurrentUserApi = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.currentUserReducer);

  const fetchUserByAccessTokenCb = useCallback(() => {
    dispatch(fetchUserByAccessToken());
  }, [dispatch]);

  const fetchUserOrderCb = useCallback(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  const fetchUserAddressCb = useCallback(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  const updateUserInfoCb = useCallback(
    (data) => {
      dispatch(updateUserInfo(data));
    },
    [dispatch]
  );

  const updateUserAddressCb = useCallback(
    (data, id) => {
      dispatch(updateUserAddress(data, id));
    },
    [dispatch]
  );

  const createUserAddressCb = useCallback(
    (data) => {
      dispatch(createUserAddress(data));
    },
    [dispatch]
  );

  const changePasswordRequestOTPCb = useCallback(
    (password, confirmPassword) => {
      dispatch(changePasswordRequestOTP(password, confirmPassword));
    },
    [dispatch]
  );

  const verifyOTPChangePasswordCb = useCallback(
    (password, codeOTP) => {
      dispatch(verifyOTPChangePassword(password, codeOTP));
    },
    [dispatch]
  );

  const deleteUserAddressCb = useCallback(
    (id) => {
      dispatch(deleteUserAddress(id));
    },
    [dispatch]
  );

  return {
    state,
    fetchUserByAccessToken: fetchUserByAccessTokenCb,
    fetchUserOrder: fetchUserOrderCb,
    fetchUserAddress: fetchUserAddressCb,
    updateUserInfo: updateUserInfoCb,
    updateUserAddress: updateUserAddressCb,
    createUserAddress: createUserAddressCb,
    changePasswordRequestOTP: changePasswordRequestOTPCb,
    verifyOTPChangePassword: verifyOTPChangePasswordCb,
    deleteUserAddress: deleteUserAddressCb,
  };
};

export default useCurrentUserApi;
