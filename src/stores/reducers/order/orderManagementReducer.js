import { ORDER_MANAGEMENT_CONST } from "../../constants";

const initialState = {
  fetchOrderPending: false,
  updateOrderPending: false,
  deleteOrderPending: false,

  isUpdateOrderSuccess: false,

  onSearchOrderPending: false,
  onFilterOrderPending: false,

  orderDataLists: [],
  selectedOrderIDs: [],
  searchedOrderLists: [],
  filteredOrderLists: [],

  totalOrderCount: 0,
  currentPage: 0,
  itemPerPage: 10,

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
};

const orderManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_PENDING:
      state.fetchOrderPending = true;
      break;
    case ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_SUCCESS:
      state.fetchOrderPending = false;
      state.orderDataLists = action.payload;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      break;
    case ORDER_MANAGEMENT_CONST.FETCH_ORDER_ADMIN_ERROR:
      state.fetchOrderPending = false;
      break;
    case ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_PENDING:
      state.updateOrderPending = true;
      state.isUpdateOrderSuccess = false;
      break;
    case ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_SUCCESS:
      state.updateOrderPending = false;
      state.isUpdateOrderSuccess = true;
      break;
    case ORDER_MANAGEMENT_CONST.UPDATE_ORDER_ADMIN_ERROR:
      state.updateOrderPending = false;
      state.isUpdateOrderSuccess = false;
      break;
    case ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_PENDING:
      state.deleteOrderPending = true;
      break;
    case ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_SUCCESS:
      state.deleteOrderPending = false;
      break;
    case ORDER_MANAGEMENT_CONST.DELETE_ORDER_ADMIN_ERROR:
      state.deleteOrderPending = false;
      break;
    case ORDER_MANAGEMENT_CONST.GET_SELECTED_ORDER_IDS:
      state.selectedOrderIDs = action.payload;
      break;
    case ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_PENDING:
      state.onSearchOrderPending = true;
      break;
    case ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_SUCCESS:
      state.onSearchOrderPending = false;
      state.searchedOrderLists = action.data;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isSearchOn = action.isSearch;
      state.searchValue = action.searchValue;
      break;
    case ORDER_MANAGEMENT_CONST.ON_SEARCH_ORDER_ERROR:
      state.onSearchOrderPending = false;
      break;
    case ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_PENDING:
      state.onFilterOrderPending = true;
      break;
    case ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_SUCCESS:
      state.onFilterOrderPending = false;
      state.filteredOrderLists = action.data;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isFilterOn = action.isFilterOn;
      state.filterValue = action.filterValue;
      break;
    case ORDER_MANAGEMENT_CONST.ON_FILTER_ORDER_ERROR:
      state.onFilterOrderPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default orderManagementReducer;
