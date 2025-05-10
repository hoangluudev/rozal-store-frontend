import { CATEGORY_CONST } from "../../constants";

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

const adminCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_PENDING:
      state.fetchCategoryPending = true;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_SUCCESS:
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
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_ERROR:
      state.fetchCategoryPending = false;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_BY_ID_PENDING:
      state.fetchCategoryByIDPending = true;
      state.selectedCategoryData = {};
      state.isUpdateCategorySuccess = false;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_BY_ID_SUCCESS:
      state.fetchCategoryByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedCategoryData = dataObj.data;
        state.categoryName = state.selectedCategoryData.name;
      }
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_BY_ID_ERROR:
      state.fetchCategoryByIDPending = false;
      break;
    case CATEGORY_CONST.CREATE_ADMIN_CATEGORY_PENDING:
      state.createCategoryPending = true;
      state.isCreateCategorySuccess = false;
      break;
    case CATEGORY_CONST.CREATE_ADMIN_CATEGORY_SUCCESS:
      state.createCategoryPending = false;
      state.isCreateCategorySuccess = true;
      break;
    case CATEGORY_CONST.CREATE_ADMIN_CATEGORY_ERROR:
      state.createCategoryPending = false;
      state.isCreateCategorySuccess = false;
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_CATEGORY_PENDING:
      state.updateCategoryPending = true;
      state.isUpdateCategorySuccess = false;
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_CATEGORY_SUCCESS:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedCategoryData = dataObj.data;
      }
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_CATEGORY_ERROR:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = false;
      break;
    case CATEGORY_CONST.DELETE_ADMIN_CATEGORY_PENDING:
      state.deleteCategoryPending = true;
      state.isDeleteCategorySuccess = false;
      break;
    case CATEGORY_CONST.DELETE_ADMIN_CATEGORY_SUCCESS:
      state.deleteCategoryPending = false;
      state.isDeleteCategorySuccess = true;
      break;
    case CATEGORY_CONST.DELETE_ADMIN_CATEGORY_ERROR:
      state.deleteCategoryPending = false;
      state.isDeleteCategorySuccess = false;
      break;
    case CATEGORY_CONST.GET_SELECTED_IDS:
      state.selectedCategoryIDs = action.payload;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_OPTIONS_PENDING:
      state.fetchCategoryOptionsPending = true;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_OPTIONS_SUCCESS:
      state.fetchCategoryOptionsPending = false;
      state.categoryOptionsList = action.payload;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_CATEGORY_OPTIONS_ERROR:
      state.fetchCategoryOptionsPending = false;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_PENDING:
      state.fetchProductTypePending = true;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_SUCCESS:
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
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_ERROR:
      state.fetchProductTypePending = false;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_BY_ID_PENDING:
      state.fetchProductTypeByIDPending = true;
      break;
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_BY_ID_SUCCESS:
      state.fetchProductTypeByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedProductTypeData = dataObj.data;
      }
      break;
    case CATEGORY_CONST.FETCH_ADMIN_PRODUCT_TYPE_BY_ID_ERROR:
      state.fetchProductTypeByIDPending = false;
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_PRODUCT_TYPE_PENDING:
      state.updateCategoryPending = true;
      state.isUpdateCategorySuccess = false;
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_PRODUCT_TYPE_SUCCESS:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedProductTypeData = dataObj.data;
      }
      break;
    case CATEGORY_CONST.UPDATE_ADMIN_PRODUCT_TYPE_ERROR:
      state.updateCategoryPending = false;
      state.isUpdateCategorySuccess = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default adminCategoryReducer;
