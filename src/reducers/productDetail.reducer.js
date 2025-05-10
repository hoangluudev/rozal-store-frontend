import {
  FETCH_PRODUCT_BY_ID_PENDING,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_ERROR,
  FETCH_RELATED_PRODUCT_BY_ID_PENDING,
  FETCH_RELATED_PRODUCT_BY_ID_SUCCESS,
  FETCH_RELATED_PRODUCT_BY_ID_ERROR,
} from "../constants/client/product.constant";

const initialState = {
  productDetailPending: false,
  fetchRelatedProductPending: false,

  productDetail: {},
  relatedProducts: [],
};

const PRODUCT_DETAIL_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_BY_ID_PENDING:
      state.productDetailPending = true;
      break;
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      state.productDetailPending = false;
      state.productDetail = action.data;
      break;
    case FETCH_PRODUCT_BY_ID_ERROR:
      state.productDetailPending = false;
      break;
    case FETCH_RELATED_PRODUCT_BY_ID_PENDING:
      state.fetchRelatedProductPending = true;
      break;
    case FETCH_RELATED_PRODUCT_BY_ID_SUCCESS:
      state.fetchRelatedProductPending = false;
      state.relatedProducts = action.data;
      break;
    case FETCH_RELATED_PRODUCT_BY_ID_ERROR:
      state.fetchRelatedProductPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default PRODUCT_DETAIL_REDUCERS;
