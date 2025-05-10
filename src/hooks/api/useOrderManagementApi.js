import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  updateOrderByID,
  deleteMultipleOrderByID,
  deleteOrderByID,
  onFilteredOrderPageChange,
  onOrderFilter,
  onOrderSearch,
  onSearchedOrderPageChange,
  getSelectedIDs,
} from "../../stores/actions/order/orderManagementActions";

const useOrderManagementApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.orderManagementReducer);

  const fetchOrdersCb = useCallback(
    (currentPage, itemPerPage) => {
      dispatch(fetchOrders(currentPage, itemPerPage));
    },
    [dispatch]
  );

  const updateOrderByIDCb = useCallback(
    (data, id) => {
      dispatch(updateOrderByID(data, id));
    },
    [dispatch]
  );

  const deleteOrderByIDCb = useCallback(
    (id) => {
      dispatch(deleteOrderByID(id));
    },
    [dispatch]
  );

  const deleteMultipleOrderByIDCb = useCallback(
    (ids) => {
      dispatch(deleteMultipleOrderByID(ids));
    },
    [dispatch]
  );

  const onFilteredOrderPageChangeCb = useCallback(
    (orderCode) => {
      dispatch(onFilteredOrderPageChange(orderCode));
    },
    [dispatch]
  );

  const onOrderFilterCb = useCallback(
    (filterQuery) => {
      dispatch(onOrderFilter(filterQuery));
    },
    [dispatch]
  );

  const onOrderSearchCb = useCallback(
    (orderCode) => {
      dispatch(onOrderSearch(orderCode));
    },
    [dispatch]
  );

  const onSearchedOrderPageChangeCb = useCallback(
    (orderCode) => {
      dispatch(onSearchedOrderPageChange(orderCode));
    },
    [dispatch]
  );

  const getSelectedIDsCb = useCallback(
    (ids) => {
      dispatch(getSelectedIDs(ids));
    },
    [dispatch]
  );

  return {
    state,
    fetchOrders: fetchOrdersCb,
    updateOrderByID: updateOrderByIDCb,
    deleteOrderByID: deleteOrderByIDCb,
    deleteMultipleOrderByID: deleteMultipleOrderByIDCb,
    onFilteredOrderPageChange: onFilteredOrderPageChangeCb,
    onOrderFilter: onOrderFilterCb,
    onOrderSearch: onOrderSearchCb,
    onSearchedOrderPageChange: onSearchedOrderPageChangeCb,
    getSelectedIDs: getSelectedIDsCb,
  };
};

export default useOrderManagementApi;
