import { RATING_CONST } from "../../constants";

const initialState = {
  createProductRatingPending: false,
};

const productRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATING_CONST.CREATE_PRODUCT_RATING_PENDING:
      state.createProductRatingPending = true;
      break;
    case RATING_CONST.CREATE_PRODUCT_RATING_SUCCESS:
      state.createProductRatingPending = false;
      break;
    case RATING_CONST.CREATE_PRODUCT_RATING_ERROR:
      state.createProductRatingPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default productRatingReducer;
