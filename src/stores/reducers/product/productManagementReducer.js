import { PRODUCT_MANAGEMENT_CONST } from "../../constants";

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

const productManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_PENDING:
      state.fetchProductPending = true;
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_SUCCESS:
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
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_ERROR:
      state.fetchProductPending = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_PENDING:
      state.fetchProductByIDPending = true;
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_SUCCESS:
      state.fetchProductByIDPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedProductData = dataObj.data;
      }
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_BY_ID_ERROR:
      state.fetchProductByIDPending = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_PENDING:
      state.createProductPending = true;
      state.isCreateProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_SUCCESS:
      state.createProductPending = false;
      state.isCreateProductSuccess = true;
      break;
    case PRODUCT_MANAGEMENT_CONST.CREATE_ADMIN_PRODUCT_ERROR:
      state.createProductPending = false;
      state.isCreateProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_PENDING:
      state.updateProductPending = true;
      state.isUpdateProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_SUCCESS:
      state.updateProductPending = false;
      state.isUpdateProductSuccess = true;
      {
        let dataObj = action.payload.data;

        state.selectedProductData = dataObj.data;
      }
      break;
    case PRODUCT_MANAGEMENT_CONST.UPDATE_ADMIN_PRODUCT_ERROR:
      state.updateProductPending = false;
      state.isUpdateProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_PENDING:
      state.deleteProductPending = true;
      state.isDeleteProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_SUCCESS:
      state.deleteProductPending = false;
      state.isDeleteProductSuccess = true;
      break;
    case PRODUCT_MANAGEMENT_CONST.DELETE_ADMIN_PRODUCT_ERROR:
      state.deleteProductPending = false;
      state.isDeleteProductSuccess = false;
      break;
    case PRODUCT_MANAGEMENT_CONST.GET_SELECTED_IDS:
      state.selectedProductIDs = action.payload;
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_PENDING:
      state.fetchProductOptionsPending = true;
      break;
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_SUCCESS:
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
    case PRODUCT_MANAGEMENT_CONST.FETCH_ADMIN_PRODUCT_OPTIONS_ERROR:
      state.fetchProductOptionsPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default productManagementReducer;
