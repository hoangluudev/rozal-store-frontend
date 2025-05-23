import { PRODUCT_CONST } from "../../constants";

const initialState = {
  itemPerPage: 10,
  totalItemCount: 0,
  totalPage: 0,
  currentPage: 1,

  fetchProductPending: false,
  fetchProductFilterPending: false,
  fetchSelectProductPending: false,
  fetchRelatedProductsPending: false,

  productLists: [],
  selectedProductData: {},
  relatedProductList: [],

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
  sortValue: "",

  filterOptions: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CONST.FETCH_PRODUCTS_PENDING:
      state.fetchProductPending = true;
      break;
    case PRODUCT_CONST.FETCH_PRODUCTS_SUCCESS:
      state.fetchProductPending = false;
      {
        let dataObj = action.payload.data;

        state.productLists = dataObj.data;
        state.totalItemCount = dataObj.totalItemCount;
        state.itemPerPage = dataObj.limit;
        state.currentPage = dataObj.page;
        state.totalPage = Math.ceil(state.totalItemCount / state.itemPerPage);

        state.isFilterOn = dataObj.isFilterOn;
        state.isSearchOn = dataObj.isSearchOn;
        state.filterValue = dataObj.filterValue;
        state.searchValue = state.filterValue.search;
        state.sortValue = dataObj.sortValue;
        state.filterOptions = {
          ...state.filterOptions,
          priceRange: dataObj.filterOptions.priceRange,
        };
      }
      break;
    case PRODUCT_CONST.FETCH_PRODUCTS_ERROR:
      state.fetchProductPending = false;
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_FILTER_OPTIONS_PENDING:
      state.fetchProductFilterPending = true;
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_FILTER_OPTIONS_SUCCESS:
      state.fetchProductFilterPending = false;
      {
        let dataObj = action.payload.data;

        state.filterOptions = {
          ...state.filterOptions,
          ...dataObj.data,
        };
      }
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_FILTER_OPTIONS_ERROR:
      state.fetchProductFilterPending = false;
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_BY_CODE_PENDING:
      state.fetchSelectProductPending = true;
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_BY_CODE_SUCCESS:
      state.fetchSelectProductPending = false;
      {
        let dataObj = action.payload.data;

        state.selectedProductData = dataObj.data;
      }
      break;
    case PRODUCT_CONST.FETCH_PRODUCT_BY_CODE_ERROR:
      state.fetchSelectProductPending = false;
      break;
    case PRODUCT_CONST.FETCH_RELATED_PRODUCTS_BY_CODE_PENDING:
      state.fetchRelatedProductsPending = true;
      break;
    case PRODUCT_CONST.FETCH_RELATED_PRODUCTS_BY_CODE_SUCCESS:
      state.fetchRelatedProductsPending = false;
      {
        let dataObj = action.payload.data;

        state.relatedProductList = dataObj.data;
      }
      break;
    case PRODUCT_CONST.FETCH_RELATED_PRODUCTS_BY_CODE_ERROR:
      state.fetchRelatedProductsPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default productReducer;
