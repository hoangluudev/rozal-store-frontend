import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onUserSignIn,
  onUserSignUp,
  onUserLogout,
  onFetchRefreshToken,
} from "../../stores/actions/userAuthActions";

const useUserAuthApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userAuthReducer);

  const onUserSignInCb = useCallback(
    (data) => {
      dispatch(onUserSignIn(data));
    },
    [dispatch]
  );

  const onUserSignUpCb = useCallback(
    (data) => {
      dispatch(onUserSignUp(data));
    },
    [dispatch]
  );

  const onUserLogoutCb = useCallback(() => {
    dispatch(onUserLogout());
  }, [dispatch]);

  const onFetchRefreshTokenCb = useCallback(() => {
    dispatch(onFetchRefreshToken());
  }, [dispatch]);

  return {
    state,
    onUserSignIn: onUserSignInCb,
    onUserSignUp: onUserSignUpCb,
    onUserLogout: onUserLogoutCb,
    onFetchRefreshToken: onFetchRefreshTokenCb,
  };
};

export default useUserAuthApi;
