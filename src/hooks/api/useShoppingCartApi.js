import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserShoppingCart,
  createCartItem,
  updateCartItem,
  selectAllCartItem,
  deleteCartItem,
  deleteAllSelectedCarts,
} from "../../stores/actions/shoppingCart";

const useShoppingCartApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.shoppingCartReducer);

  const fetchUserShoppingCartCb = useCallback(
    (query) => {
      dispatch(fetchUserShoppingCart(query));
    },
    [dispatch]
  );

  const createCartItemCb = useCallback(
    (data) => {
      dispatch(createCartItem(data));
    },
    [dispatch]
  );

  const updateCartItemCb = useCallback(
    (data, id) => {
      dispatch(updateCartItem(data, id));
    },
    [dispatch]
  );

  const selectAllCartItemCb = useCallback(
    (id) => {
      dispatch(selectAllCartItem(id));
    },
    [dispatch]
  );

  const deleteCartItemCb = useCallback(
    (ids) => {
      dispatch(deleteCartItem(ids));
    },
    [dispatch]
  );

  const deleteAllSelectedCartsCb = useCallback(
    (ids) => {
      dispatch(deleteAllSelectedCarts(ids));
    },
    [dispatch]
  );

  return {
    state,
    fetchUserShoppingCart: fetchUserShoppingCartCb,
    createCartItem: createCartItemCb,
    updateCartItem: updateCartItemCb,
    selectAllCartItem: selectAllCartItemCb,
    deleteCartItem: deleteCartItemCb,
    deleteAllSelectedCarts: deleteAllSelectedCartsCb,
  };
};

export default useShoppingCartApi;
