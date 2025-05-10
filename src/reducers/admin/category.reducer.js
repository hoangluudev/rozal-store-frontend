import {
  FETCH_ADMIN_CATEGORY_PENDING,
  FETCH_ADMIN_CATEGORY_SUCCESS,
  FETCH_ADMIN_CATEGORY_ERROR,
  FETCH_ADMIN_CATEGORY_BY_ID_PENDING,
  FETCH_ADMIN_CATEGORY_BY_ID_SUCCESS,
  FETCH_ADMIN_CATEGORY_BY_ID_ERROR,
  CREATE_ADMIN_CATEGORY_PENDING,
  CREATE_ADMIN_CATEGORY_SUCCESS,
  CREATE_ADMIN_CATEGORY_ERROR,
  UPDATE_ADMIN_CATEGORY_PENDING,
  UPDATE_ADMIN_CATEGORY_SUCCESS,
  UPDATE_ADMIN_CATEGORY_ERROR,
  DELETE_ADMIN_CATEGORY_PENDING,
  DELETE_ADMIN_CATEGORY_SUCCESS,
  DELETE_ADMIN_CATEGORY_ERROR,
  FETCH_ADMIN_CATEGORY_OPTIONS_PENDING,
  FETCH_ADMIN_CATEGORY_OPTIONS_SUCCESS,
  FETCH_ADMIN_CATEGORY_OPTIONS_ERROR,
  GET_SELECTED_IDS,
  FETCH_ADMIN_PRODUCT_TYPE_PENDING,
  FETCH_ADMIN_PRODUCT_TYPE_SUCCESS,
  FETCH_ADMIN_PRODUCT_TYPE_ERROR,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_PENDING,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_SUCCESS,
  FETCH_ADMIN_PRODUCT_TYPE_BY_ID_ERROR,
  UPDATE_ADMIN_PRODUCT_TYPE_PENDING,
  UPDATE_ADMIN_PRODUCT_TYPE_SUCCESS,
  UPDATE_ADMIN_PRODUCT_TYPE_ERROR,
} from "../../constants/admin/category.constant";

const initialState = {
  fetchCategoryPending: false,
  fetchCategoryByIDPending: false,
  createCategoryPending: false,
  updateCategoryPending: false,
  deleteCategoryPending: false,
  fetchCategoryOptionsPending: false,

  fetchProductTypePending: false,
  fetchProductTypeByIDPending: false,

  isCreateCategorySuccess: false,
  isUpdateCategorySuccess: false,
  isDeleteCategorySuccess: false,

  categoryDataLists: [],
  selectedCategoryData: {},
  selectedCategoryIDs: [],

  categoryOptionsList: [],

  productTypeDataLists: [],
  selectedProductTypeData: {},
  selectedProductTypeIDs: [],

  categoryName: null,
  parentName: null,
  totalItemCount: 0,
  currentPage: 0,
  itemPerPage: 10,

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
};

const CATEGORY_ADMIN_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_CATEGORY_PENDING:
      state.fetchCategoryPending = true;
      break;
    case FETCH_ADMIN_CATEGORY_SUCCESS:
      state.fetchCategoryPending = false;
      {
        let dataObj = action.payload.data;

        state.categoryDataLists = dataObj.data;
        state.totalItemCount = dataObj.totalItemCount;
        state.itemPerPage = dataObj.limit;
        state.currentPage = dataObj.page;

        state.isFilterOn = dataObj.isFilterOn;
        state.isSearchOn = dataObj.isSearchOn;
        state.filterValue = dataObj.filterValue;
        state.searchValue = state.filterValue.search;
      }
      break;
    case FETCH_ADMIN_CATEGORY_ERROR:
      state.fetchCategoryPending = false;
      break;
    case FETCH_ADMIN_CATEGORY_BY_ID_PENDING:
      state.fetchCategoryByIDPending = true;
      state.selectedCategoryData = {};
      state.isUpdateCategorySuccess = false;
      break;
    case FETCH_ADMIN_CATEGORY_BY_ID_SUCCESS:
      state.fetchCategoryByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedCategoryData = dataObj.data;
        state.categoryName = state.selectedCategoryData.name;
      }
      break;
    case FETCH_ADMIN_CATEGORY_BY_ID_ERROR:
      state.fetchCategoryByIDPending = false;
      break;
    case CREATE_ADMIN_CATEGORY_PENDING:
      state.createCategoryPending = true;
      state.isCreateCategorySuccess = false;
      break;
    case CREATE_ADMIN_CATEGORY_SUCCESS:
      state.createCategoryPending = false;
      state.isCreateCategorySuccess = true;
      break;
    case CREATE_ADMIN_CATEGORY_ERROR:
      state.createCategoryPending = false;
      state.isCreateCategorySuccess = false;
      break;
    case UPDATE_ADMIN_CATEGORY_PENDING:
      state.updateCategoryPending = true;
      state.isUpdateCategorySuccess = false;
      break;
    case UPDATE_ADMIN_CATEGORY_SUCCESS:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedCategoryData = dataObj.data;
      }
      break;
    case UPDATE_ADMIN_CATEGORY_ERROR:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = false;
      break;
    case DELETE_ADMIN_CATEGORY_PENDING:
      state.deleteCategoryPending = true;
      state.isDeleteCategorySuccess = false;
      break;
    case DELETE_ADMIN_CATEGORY_SUCCESS:
      state.deleteCategoryPending = false;
      state.isDeleteCategorySuccess = true;
      break;
    case DELETE_ADMIN_CATEGORY_ERROR:
      state.deleteCategoryPending = false;
      state.isDeleteCategorySuccess = false;
      break;
    case GET_SELECTED_IDS:
      state.selectedCategoryIDs = action.payload;
      break;
    case FETCH_ADMIN_CATEGORY_OPTIONS_PENDING:
      state.fetchCategoryOptionsPending = true;
      break;
    case FETCH_ADMIN_CATEGORY_OPTIONS_SUCCESS:
      state.fetchCategoryOptionsPending = false;
      state.categoryOptionsList = action.payload;
      break;
    case FETCH_ADMIN_CATEGORY_OPTIONS_ERROR:
      state.fetchCategoryOptionsPending = false;
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_PENDING:
      state.fetchProductTypePending = true;
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_SUCCESS:
      state.fetchProductTypePending = false;
      {
        let dataObj = action.payload.data;

        state.productTypeDataLists = dataObj.data;
        state.totalItemCount = dataObj.totalItemCount;
        state.itemPerPage = dataObj.limit;
        state.currentPage = dataObj.page;

        state.isFilterOn = dataObj.isFilterOn;
        state.isSearchOn = dataObj.isSearchOn;
        state.filterValue = dataObj.filterValue;
        state.searchValue = state.filterValue.search;
      }
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_ERROR:
      state.fetchProductTypePending = false;
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_BY_ID_PENDING:
      state.fetchProductTypeByIDPending = true;
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_BY_ID_SUCCESS:
      state.fetchProductTypeByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedProductTypeData = dataObj.data;
      }
      break;
    case FETCH_ADMIN_PRODUCT_TYPE_BY_ID_ERROR:
      state.fetchProductTypeByIDPending = false;
      break;
    case UPDATE_ADMIN_PRODUCT_TYPE_PENDING:
      state.updateCategoryPending = true;
      state.isUpdateCategorySuccess = false;
      break;
    case UPDATE_ADMIN_PRODUCT_TYPE_SUCCESS:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedProductTypeData = dataObj.data;
      }
      break;
    case UPDATE_ADMIN_PRODUCT_TYPE_ERROR:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default CATEGORY_ADMIN_REDUCERS;
