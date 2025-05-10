import {
  FETCH_PRODUCTS_WITH_FILTER_PENDING,
  FETCH_PRODUCTS_WITH_FILTER_SUCCESS,
  FETCH_PRODUCTS_WITH_FILTER_ERROR,
  FETCH_FEATURED_PRODUCT_PENDING,
  FETCH_FEATURED_PRODUCT_SUCCESS,
  FETCH_FEATURED_PRODUCT_ERROR,
  FETCH_LATEST_PRODUCT_PENDING,
  FETCH_LATEST_PRODUCT_SUCCESS,
  FETCH_LATEST_PRODUCT_ERROR,
} from "../constants/client/product.constant";

const initialState = {
  totalItemCount: 0,
  currentPage: 1,
  itemPerPage: 8,
  totalPage: 0,

  fetchProductPending: false,

  featuredProductPending: false,
  latestProductPending: false,

  productLists: [],

  isSearchOn: false,
  isFilterOn: false,
  searchValue: "",
  filterValue: {},
  isPageUnavailable: false,

  productCategoryLists: [],
  productBrandLists: [],
  productGenderLists: [],

  featuredProducts: null,
  latestProducts: null,
};

const PRODUCTS_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_WITH_FILTER_PENDING:
      state.fetchProductPending = true;
      break;
    case FETCH_PRODUCTS_WITH_FILTER_SUCCESS:
      state.fetchProductPending = false;
      state.productLists = action.data;
      state.itemPerPage = action.limit;
      state.currentPage = action.currentPage;

      state.totalProductCount = action.totalProductCount;
      state.totalPage = Math.ceil(state.totalProductCount / state.itemPerPage);

      state.isFilterOn = action.isFilterOn;
      state.isSearchOn = action.isSearch;
      state.filterValue = action.filterValue;
      state.searchValue = state.filterValue.search;
      state.isPageUnavailable = action.isPageUnavailable;

      state.productCategoryLists = action.categoryList;
      state.productBrandLists = action.brandList;
      state.productGenderLists = action.genderList;
      break;
    case FETCH_PRODUCTS_WITH_FILTER_ERROR:
      state.fetchProductPending = false;
      break;
    case FETCH_FEATURED_PRODUCT_PENDING:
      state.productPending = true;
      break;
    case FETCH_FEATURED_PRODUCT_SUCCESS:
      state.featuredProductPending = false;
      state.featuredProducts = action.data;
      break;
    case FETCH_FEATURED_PRODUCT_ERROR:
      state.featuredProductPending = false;
      break;
    case FETCH_LATEST_PRODUCT_PENDING:
      state.latestProductPending = true;
      break;
    case FETCH_LATEST_PRODUCT_SUCCESS:
      state.latestProductPending = false;
      state.latestProducts = action.data;
      break;
    case FETCH_LATEST_PRODUCT_ERROR:
      state.latestProductPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default PRODUCTS_REDUCERS;
