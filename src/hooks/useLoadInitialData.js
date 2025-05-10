import { useEffect } from "react";
import { getAccessToken, isAccessTokenExpired } from "../services/tokenService";
import { useLocation } from "react-router-dom";
import {
  useUserAuthApi,
  useShoppingCartApi,
  useCurrentUserApi,
  useOrderApi,
} from "./api";

const useLoadInitialData = (pageRole) => {
  const { onFetchRefreshToken } = useUserAuthApi();
  const { isRefreshTokenExpired } = useUserAuthApi().state;
  const { fetchUserShoppingCart } = useShoppingCartApi();
  const {
    createCartItemPending,
    updateCartItemPending,
    deleteCartItemPending,
  } = useShoppingCartApi().state;
  const { fetchUserByAccessToken } = useCurrentUserApi();
  const { currentUserLogged, isRefresh } = useCurrentUserApi().state;
  const { repurchaseOrderPending } = useOrderApi().state;
  const location = useLocation();
  const searchParamsData = location.search;

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      fetchUserByAccessToken();
    }
  }, [fetchUserByAccessToken]);
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && !isRefreshTokenExpired) {
      const interval = setInterval(() => {
        const isTokenExpired = isAccessTokenExpired();
        if (isTokenExpired) {
          onFetchRefreshToken();
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isRefreshTokenExpired, onFetchRefreshToken]);
  useEffect(() => {
    if (isRefresh) {
      onFetchRefreshToken();
    }
  }, [isRefresh, onFetchRefreshToken]);
  useEffect(() => {
    if (pageRole === "user") {
      if (
        currentUserLogged ||
        createCartItemPending ||
        updateCartItemPending ||
        deleteCartItemPending ||
        repurchaseOrderPending
      ) {
        fetchUserShoppingCart(searchParamsData);
      }
    }
  }, [
    pageRole,
    currentUserLogged,
    createCartItemPending,
    updateCartItemPending,
    deleteCartItemPending,
    searchParamsData,
    repurchaseOrderPending,
    fetchUserShoppingCart,
  ]);
};

export default useLoadInitialData;
