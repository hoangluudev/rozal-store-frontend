import { USER_MANAGEMENT_CONST } from "../../constants";

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

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_MANAGEMENT_CONST.FETCH_CUSTOMER_PENDING:
      state.fetchCustomerPending = true;
      break;
    case USER_MANAGEMENT_CONST.FETCH_CUSTOMER_SUCCESS:
      state.fetchCustomerPending = false;
      state.customerDataLists = action.data;
      state.totalClientCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      break;
    case USER_MANAGEMENT_CONST.FETCH_CUSTOMER_ERROR:
      state.fetchCustomerPending = false;
      break;
    case USER_MANAGEMENT_CONST.CREATE_CUSTOMER_PENDING:
      state.createCustomerPending = true;
      state.createCustomerResponse = null;
      break;
    case USER_MANAGEMENT_CONST.CREATE_CUSTOMER_SUCCESS:
      state.createCustomerPending = false;
      state.createCustomerResponse = action.data;
      break;
    case USER_MANAGEMENT_CONST.CREATE_CUSTOMER_ERROR:
      state.createCustomerPending = false;
      break;
    case USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_PENDING:
      state.updateCustomerPending = true;
      break;
    case USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_SUCCESS:
      state.updateCustomerPending = false;
      state.updateCustomerResponse = action.data;
      break;
    case USER_MANAGEMENT_CONST.UPDATE_CUSTOMER_BY_ID_ERROR:
      state.updateCustomerPending = false;
      break;
    case USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_PENDING:
      state.deleteUserPending = true;
      break;
    case USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_SUCCESS:
      state.selectedUserIDs = [];
      state.deleteUserPending = false;
      break;
    case USER_MANAGEMENT_CONST.DELETE_USER_BY_ID_ERROR:
      state.deleteUserPending = false;
      break;
    case USER_MANAGEMENT_CONST.GET_SELECTED_IDS:
      state.selectedUserIDs = action.payload;
      break;
    case USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_PENDING:
      state.onSearchCustomerPending = true;
      break;
    case USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_SUCCESS:
      state.onSearchCustomerPending = false;
      state.searchedCustomerLists = action.data;
      state.totalClientCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isSearchOn = action.isSearch;
      state.searchValue = action.searchValue;
      break;
    case USER_MANAGEMENT_CONST.ON_SEARCH_CUSTOMER_ERROR:
      state.onSearchCustomerPending = false;
      break;
    case USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_PENDING:
      state.onFilterCustomerPending = true;
      break;
    case USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_SUCCESS:
      state.onFilterCustomerPending = false;
      state.filteredCustomerLists = action.data;
      state.currentPage = action.currentPage;
      state.itemPerPage = action.limit;
      state.totalClientCount = action.totalCount;
      state.isFilterOn = action.isFilterOn;
      state.filterValue = action.filterValue;
      break;
    case USER_MANAGEMENT_CONST.ON_FILTER_CUSTOMER_ERROR:
      state.onFilterCustomerPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default userManagementReducer;
