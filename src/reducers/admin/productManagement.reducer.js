import {
  FETCH_PRODUCT_ADMIN_PENDING,
  FETCH_PRODUCT_ADMIN_SUCCESS,
  FETCH_PRODUCT_ADMIN_ERROR,
  CREATE_PRODUCT_ADMIN_PENDING,
  CREATE_PRODUCT_ADMIN_SUCCESS,
  CREATE_PRODUCT_ADMIN_ERROR,
  UPDATE_PRODUCT_ADMIN_PENDING,
  UPDATE_PRODUCT_ADMIN_SUCCESS,
  UPDATE_PRODUCT_ADMIN_ERROR,
  DELETE_PRODUCT_ADMIN_PENDING,
  DELETE_PRODUCT_ADMIN_SUCCESS,
  DELETE_PRODUCT_ADMIN_ERROR,
  GET_SELECTED_PRODUCT_IDS,
  ON_SEARCH_PRODUCT_PENDING,
  ON_SEARCH_PRODUCT_SUCCESS,
  ON_SEARCH_PRODUCT_ERROR,
  ON_FILTER_PRODUCT_PENDING,
  ON_FILTER_PRODUCT_SUCCESS,
  ON_FILTER_PRODUCT_ERROR,
} from "../../constants/admin/productManagement.constant";

const initialState = {
  fetchProductPending: false,
  createProductPending: false,
  updateProductPending: false,
  deleteProductPending: false,

  onSearchProductPending: false,
  onFilterProductPending: false,

  productDataLists: [],
  selectedProductIDs: [],
  searchedProductLists: [],
  filteredProductLists: [],

  productCategoryLists: [],
  productBrandLists: [],

  createProductResponse: null,
  updateProductResponse: null,
  deleteProductResponse: null,

  totalProductCount: 0,
  currentPage: 0,
  itemPerPage: 10,

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
};

const PRODUCTS_ADMIN_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_ADMIN_PENDING:
      state.fetchProductPending = true;
      break;
    case FETCH_PRODUCT_ADMIN_SUCCESS:
      state.fetchProductPending = false;
      state.productDataLists = action.payload;
      state.totalProductCount = action.totalCount;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.productCategoryLists = action.categoryList;
      state.productBrandLists = action.brandList;
      break;
    case FETCH_PRODUCT_ADMIN_ERROR:
      state.fetchProductPending = false;
      break;
    case CREATE_PRODUCT_ADMIN_PENDING:
      state.createProductPending = true;
      state.createProductResponse = null;
      break;
    case CREATE_PRODUCT_ADMIN_SUCCESS:
      state.createProductPending = false;
      state.createProductResponse = action.data;
      break;
    case CREATE_PRODUCT_ADMIN_ERROR:
      state.createProductPending = false;
      break;
    case UPDATE_PRODUCT_ADMIN_PENDING:
      state.updateProductPending = true;
      break;
    case UPDATE_PRODUCT_ADMIN_SUCCESS:
      state.updateProductPending = false;
      state.updateProductResponse = action.data;
      break;
    case UPDATE_PRODUCT_ADMIN_ERROR:
      state.updateProductPending = false;
      break;
    case DELETE_PRODUCT_ADMIN_PENDING:
      state.deleteProductPending = true;
      break;
    case DELETE_PRODUCT_ADMIN_SUCCESS:
      state.deleteProductPending = false;
      state.deleteProductResponse = action.data;
      break;
    case DELETE_PRODUCT_ADMIN_ERROR:
      state.deleteProductPending = false;
      break;
    case GET_SELECTED_PRODUCT_IDS:
      state.selectedProductIDs = action.payload;
      break;
    case ON_SEARCH_PRODUCT_PENDING:
      state.onSearchProductPending = true;
      break;
    case ON_SEARCH_PRODUCT_SUCCESS:
      state.onSearchProductPending = false;
      state.searchedProductLists = action.data;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.totalProductCount = action.totalCount;
      state.isSearchOn = action.isSearch;
      state.searchValue = action.searchValue;
      break;
    case ON_SEARCH_PRODUCT_ERROR:
      state.onSearchProductPending = false;
      break;
    case ON_FILTER_PRODUCT_PENDING:
      state.onFilterProductPending = true;
      break;
    case ON_FILTER_PRODUCT_SUCCESS:
      state.onFilterProductPending = false;
      state.filteredProductLists = action.data;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;
      state.totalProductCount = action.totalCount;
      state.isFilterOn = action.isFilterOn;
      state.filterValue = action.filterValue;
      break;
    case ON_FILTER_PRODUCT_ERROR:
      state.onFilterProductPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default PRODUCTS_ADMIN_REDUCERS;
