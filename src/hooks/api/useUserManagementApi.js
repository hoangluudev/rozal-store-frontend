import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  getSelectedIDs,
  createCustomer,
  deleteMultipleUserByID,
  deleteUserByID,
  onCustomerFilter,
  onCustomerSearch,
  onFilteredCustomerPageChange,
  onSearchedCustomerPageChange,
  updateUserByID,
} from "../../stores/actions/user/userManagementActions";

const useUserManagementApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userManagementReducer);

  const fetchClientsCb = useCallback(
    (currentPage, itemPerPage) => {
      dispatch(fetchClients(currentPage, itemPerPage));
    },
    [dispatch]
  );

  const createCustomerCb = useCallback(
    (userData) => {
      dispatch(createCustomer(userData));
    },
    [dispatch]
  );

  const updateUserByIDCb = useCallback(
    (data, id) => {
      dispatch(updateUserByID(data, id));
    },
    [dispatch]
  );

  const deleteUserByIDCb = useCallback(
    (id) => {
      dispatch(deleteUserByID(id));
    },
    [dispatch]
  );

  const deleteMultipleUserByIDCb = useCallback(
    (ids) => {
      dispatch(deleteMultipleUserByID(ids));
    },
    [dispatch]
  );

  const getSelectedIDsCb = useCallback(
    (ids) => {
      dispatch(getSelectedIDs(ids));
    },
    [dispatch]
  );

  const onCustomerSearchCb = useCallback(
    (currentPage, itemPerPage, searchParams) => {
      dispatch(onCustomerSearch(currentPage, itemPerPage, searchParams));
    },
    [dispatch]
  );

  const onCustomerFilterCb = useCallback(
    (currentPage, itemPerPage, searchParams) => {
      dispatch(onCustomerFilter(currentPage, itemPerPage, searchParams));
    },
    [dispatch]
  );

  const onFilteredCustomerPageChangeCb = useCallback(
    (currentPage, itemPerPage) => {
      dispatch(onFilteredCustomerPageChange(currentPage, itemPerPage));
    },
    [dispatch]
  );

  const onSearchedCustomerPageChangeCb = useCallback(
    (currentPage, itemPerPage) => {
      dispatch(onSearchedCustomerPageChange(currentPage, itemPerPage));
    },
    [dispatch]
  );

  return {
    state,
    fetchClients: fetchClientsCb,
    createCustomer: createCustomerCb,
    updateUserByID: updateUserByIDCb,
    deleteUserByID: deleteUserByIDCb,
    deleteMultipleUserByID: deleteMultipleUserByIDCb,
    getSelectedIDs: getSelectedIDsCb,
    onCustomerSearch: onCustomerSearchCb,
    onCustomerFilter: onCustomerFilterCb,
    onFilteredCustomerPageChange: onFilteredCustomerPageChangeCb,
    onSearchedCustomerPageChange: onSearchedCustomerPageChangeCb,
  };
};

export default useUserManagementApi;
