import {
  FETCH_ADMIN_PRODUCT_PENDING,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_PRODUCT_ERROR,
  FETCH_ADMIN_PRODUCT_BY_ID_PENDING,
  FETCH_ADMIN_PRODUCT_BY_ID_SUCCESS,
  FETCH_ADMIN_PRODUCT_BY_ID_ERROR,
  CREATE_ADMIN_PRODUCT_PENDING,
  CREATE_ADMIN_PRODUCT_SUCCESS,
  CREATE_ADMIN_PRODUCT_ERROR,
  UPDATE_ADMIN_PRODUCT_PENDING,
  UPDATE_ADMIN_PRODUCT_SUCCESS,
  UPDATE_ADMIN_PRODUCT_ERROR,
  DELETE_ADMIN_PRODUCT_PENDING,
  DELETE_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_ERROR,
  GET_SELECTED_IDS,
  FETCH_ADMIN_PRODUCT_OPTIONS_PENDING,
  FETCH_ADMIN_PRODUCT_OPTIONS_SUCCESS,
  FETCH_ADMIN_PRODUCT_OPTIONS_ERROR,
} from "../../constants/admin/product.constant";

const initialState = {
  fetchProductPending: false,
  fetchProductByIDPending: false,
  createProductPending: false,
  updateProductPending: false,
  deleteProductPending: false,
  fetchProductOptionsPending: false,

  isCreateProductSuccess: false,
  isUpdateProductSuccess: false,
  isDeleteProductSuccess: false,

  productDataLists: [],
  selectedProductData: {},
  productOptionsList: [],
  selectedProductIDs: [],

  parentName: null,
  totalItemCount: 0,
  currentPage: 0,
  itemPerPage: 10,

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
  categoryOptions: [],
  subcategoryOptions: [],
  genderOptions: [],
  statusOptions: [],
  brandOptions: [],
  brandLists: [],
};

const PRODUCT_ALPHA_ADMIN_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_PRODUCT_PENDING:
      state.fetchProductPending = true;
      break;
    case FETCH_ADMIN_PRODUCT_SUCCESS:
      state.fetchProductPending = false;
      {
        let dataObj = action.payload.data;

        state.productDataLists = dataObj.data;
        state.totalItemCount = dataObj.totalItemCount;
        state.itemPerPage = dataObj.limit;
        state.currentPage = dataObj.page;

        state.isFilterOn = dataObj.isFilterOn;
        state.isSearchOn = dataObj.isSearchOn;
        state.filterValue = dataObj.filterValue;
        state.searchValue = state.filterValue.search;
      }
      break;
    case FETCH_ADMIN_PRODUCT_ERROR:
      state.fetchProductPending = false;
      break;
    case FETCH_ADMIN_PRODUCT_BY_ID_PENDING:
      state.fetchProductByIDPending = true;
      break;
    case FETCH_ADMIN_PRODUCT_BY_ID_SUCCESS:
      state.fetchProductByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedProductData = dataObj.data;
      }
      break;
    case FETCH_ADMIN_PRODUCT_BY_ID_ERROR:
      state.fetchProductByIDPending = false;
      break;
    case CREATE_ADMIN_PRODUCT_PENDING:
      state.createProductPending = true;
      state.isCreateProductSuccess = false;
      break;
    case CREATE_ADMIN_PRODUCT_SUCCESS:
      state.createProductPending = false;
      state.isCreateProductSuccess = true;
      break;
    case CREATE_ADMIN_PRODUCT_ERROR:
      state.createProductPending = false;
      state.isCreateProductSuccess = false;
      break;
    case UPDATE_ADMIN_PRODUCT_PENDING:
      state.updateProductPending = true;
      state.isUpdateProductSuccess = false;
      break;
    case UPDATE_ADMIN_PRODUCT_SUCCESS:
      state.updateProductPending = false;
      state.isUpdateProductSuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedProductData = dataObj.data;
      }
      break;
    case UPDATE_ADMIN_PRODUCT_ERROR:
      state.updateProductPending = false;
      state.isUpdateProductSuccess = false;
      break;
    case DELETE_ADMIN_PRODUCT_PENDING:
      state.deleteProductPending = true;
      state.isDeleteProductSuccess = false;
      break;
    case DELETE_ADMIN_PRODUCT_SUCCESS:
      state.deleteProductPending = false;
      state.isDeleteProductSuccess = true;
      break;
    case DELETE_ADMIN_PRODUCT_ERROR:
      state.deleteProductPending = false;
      state.isDeleteProductSuccess = false;
      break;
    case GET_SELECTED_IDS:
      state.selectedProductIDs = action.payload;
      break;
    case FETCH_ADMIN_PRODUCT_OPTIONS_PENDING:
      state.fetchProductOptionsPending = true;
      break;
    case FETCH_ADMIN_PRODUCT_OPTIONS_SUCCESS:
      state.fetchProductOptionsPending = false;
      {
        let dataObj = action.payload.data;

        state.categoryOptions = dataObj.categoryOptions;
        state.productTypeOptions = dataObj.productTypeOptions;
        state.brandLists = dataObj.brandLists;
        state.brandOptions = dataObj.brandOptions;
        state.genderOptions = dataObj.genderOptions;
        state.statusOptions = dataObj.statusOptions;
      }
      break;
    case FETCH_ADMIN_PRODUCT_OPTIONS_ERROR:
      state.fetchProductOptionsPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default PRODUCT_ALPHA_ADMIN_REDUCERS;
