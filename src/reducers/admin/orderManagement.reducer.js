import {
  FETCH_ORDER_ADMIN_PENDING,
  FETCH_ORDER_ADMIN_SUCCESS,
  FETCH_ORDER_ADMIN_ERROR,
  UPDATE_ORDER_ADMIN_PENDING,
  UPDATE_ORDER_ADMIN_SUCCESS,
  UPDATE_ORDER_ADMIN_ERROR,
  DELETE_ORDER_ADMIN_PENDING,
  DELETE_ORDER_ADMIN_SUCCESS,
  DELETE_ORDER_ADMIN_ERROR,
  GET_SELECTED_ORDER_IDS,
  ON_SEARCH_ORDER_PENDING,
  ON_SEARCH_ORDER_SUCCESS,
  ON_SEARCH_ORDER_ERROR,
  ON_FILTER_ORDER_PENDING,
  ON_FILTER_ORDER_SUCCESS,
  ON_FILTER_ORDER_ERROR,
} from "../../constants/admin/orderManagement.constant";

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

const ORDERS_ADMIN_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_ADMIN_PENDING:
      state.fetchOrderPending = true;
      break;
    case FETCH_ORDER_ADMIN_SUCCESS:
      state.fetchOrderPending = false;
      state.orderDataLists = action.payload;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      break;
    case FETCH_ORDER_ADMIN_ERROR:
      state.fetchOrderPending = false;
      break;
    case UPDATE_ORDER_ADMIN_PENDING:
      state.updateOrderPending = true;
      state.isUpdateOrderSuccess = false;
      break;
    case UPDATE_ORDER_ADMIN_SUCCESS:
      state.updateOrderPending = false;
      state.isUpdateOrderSuccess = true;
      break;
    case UPDATE_ORDER_ADMIN_ERROR:
      state.updateOrderPending = false;
      state.isUpdateOrderSuccess = false;
      break;
    case DELETE_ORDER_ADMIN_PENDING:
      state.deleteOrderPending = true;
      break;
    case DELETE_ORDER_ADMIN_SUCCESS:
      state.deleteOrderPending = false;
      break;
    case DELETE_ORDER_ADMIN_ERROR:
      state.deleteOrderPending = false;
      break;
    case GET_SELECTED_ORDER_IDS:
      state.selectedOrderIDs = action.payload;
      break;
    case ON_SEARCH_ORDER_PENDING:
      state.onSearchOrderPending = true;
      break;
    case ON_SEARCH_ORDER_SUCCESS:
      state.onSearchOrderPending = false;
      state.searchedOrderLists = action.data;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isSearchOn = action.isSearch;
      state.searchValue = action.searchValue;
      break;
    case ON_SEARCH_ORDER_ERROR:
      state.onSearchOrderPending = false;
      break;
    case ON_FILTER_ORDER_PENDING:
      state.onFilterOrderPending = true;
      break;
    case ON_FILTER_ORDER_SUCCESS:
      state.onFilterOrderPending = false;
      state.filteredOrderLists = action.data;
      state.totalOrderCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.isFilterOn = action.isFilterOn;
      state.filterValue = action.filterValue;
      break;
    case ON_FILTER_ORDER_ERROR:
      state.onFilterOrderPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default ORDERS_ADMIN_REDUCERS;
