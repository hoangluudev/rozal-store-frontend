import {
  FETCH_CUSTOMER_PENDING,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_ERROR,
  CREATE_CUSTOMER_PENDING,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  UPDATE_CUSTOMER_BY_ID_PENDING,
  UPDATE_CUSTOMER_BY_ID_SUCCESS,
  UPDATE_CUSTOMER_BY_ID_ERROR,
  DELETE_USER_BY_ID_PENDING,
  DELETE_USER_BY_ID_SUCCESS,
  DELETE_USER_BY_ID_ERROR,
  GET_SELECTED_IDS,
  ON_SEARCH_CUSTOMER_PENDING,
  ON_SEARCH_CUSTOMER_SUCCESS,
  ON_SEARCH_CUSTOMER_ERROR,
  ON_FILTER_CUSTOMER_PENDING,
  ON_FILTER_CUSTOMER_SUCCESS,
  ON_FILTER_CUSTOMER_ERROR,
} from "../../constants/admin/userManagement.constant";

const initialState = {
  fetchCustomerPending: false,
  createCustomerPending: false,
  updateCustomerPending: false,
  deleteUserPending: false,

  onSearchCustomerPending: false,
  onFilterCustomerPending: false,

  customerDataLists: [],
  searchedCustomerLists: [],
  filteredCustomerLists: [],
  selectedUserIDs: [],

  createCustomerResponse: null,
  updateCustomerResponse: null,
  deleteUserResponse: null,

  totalClientCount: 0,
  currentPage: 0,
  itemPerPage: 10,

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
};

const USERS_ADMIN_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_PENDING:
      state.fetchCustomerPending = true;
      break;
    case FETCH_CUSTOMER_SUCCESS:
      state.fetchCustomerPending = false;
      state.customerDataLists = action.data;
      state.totalClientCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      break;
    case FETCH_CUSTOMER_ERROR:
      state.fetchCustomerPending = false;
      break;
    case CREATE_CUSTOMER_PENDING:
      state.createCustomerPending = true;
      state.createCustomerResponse = null;
      break;
    case CREATE_CUSTOMER_SUCCESS:
      state.createCustomerPending = false;
      state.createCustomerResponse = action.data;
      break;
    case CREATE_CUSTOMER_ERROR:
      state.createCustomerPending = false;
      break;
    case UPDATE_CUSTOMER_BY_ID_PENDING:
      state.updateCustomerPending = true;
      break;
    case UPDATE_CUSTOMER_BY_ID_SUCCESS:
      state.updateCustomerPending = false;
      state.updateCustomerResponse = action.data;
      break;
    case UPDATE_CUSTOMER_BY_ID_ERROR:
      state.updateCustomerPending = false;
      break;
    case DELETE_USER_BY_ID_PENDING:
      state.deleteUserPending = true;
      break;
    case DELETE_USER_BY_ID_SUCCESS:
      state.selectedUserIDs = [];
      state.deleteUserPending = false;
      break;
    case DELETE_USER_BY_ID_ERROR:
      state.deleteUserPending = false;
      break;
    case GET_SELECTED_IDS:
      state.selectedUserIDs = action.payload;
      break;
    case ON_SEARCH_CUSTOMER_PENDING:
      state.onSearchCustomerPending = true;
      break;
    case ON_SEARCH_CUSTOMER_SUCCESS:
      state.onSearchCustomerPending = false;
      state.searchedCustomerLists = action.data;
      state.totalClientCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isSearchOn = action.isSearch;
      state.searchValue = action.searchValue;
      break;
    case ON_SEARCH_CUSTOMER_ERROR:
      state.onSearchCustomerPending = false;
      break;
    case ON_FILTER_CUSTOMER_PENDING:
      state.onFilterCustomerPending = true;
      break;
    case ON_FILTER_CUSTOMER_SUCCESS:
      state.onFilterCustomerPending = false;
      state.filteredCustomerLists = action.data;
      state.currentPage = action.currentPage;
      state.itemPerPage = action.limit;
      state.totalClientCount = action.totalCount;
      state.isFilterOn = action.isFilterOn;
      state.filterValue = action.filterValue;
      break;
    case ON_FILTER_CUSTOMER_ERROR:
      state.onFilterCustomerPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default USERS_ADMIN_REDUCERS;
