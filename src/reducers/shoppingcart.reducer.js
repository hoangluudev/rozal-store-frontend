import {
  CREATE_CART_ITEM_PENDING,
  CREATE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_ERROR,
  FETCH_CART_PENDING,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  UPDATE_CART_ITEM_PENDING,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_ERROR,
  DELETE_CART_ITEM_PENDING,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_ERROR,
} from "../constants/shoppingcart.constant";

const initialState = {
  addToCartPending: false,
  getCartPending: false,
  updateCartItemPending: false,
  deleteCartItemPending: false,

  addToCartResponse: null,
  updateCartResponse: null,
  deleteCartItemResponse: null,

  userCartItems: [],
};

const SHOPPING_CART_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CART_ITEM_PENDING:
      state.addToCartPending = true;
      break;
    case CREATE_CART_ITEM_SUCCESS:
      state.addToCartPending = false;
      state.addToCartResponse = action.data;
      break;
    case CREATE_CART_ITEM_ERROR:
      state.addToCartPending = false;
      break;
    case FETCH_CART_PENDING:
      state.getCartPending = true;
      break;
    case FETCH_CART_SUCCESS:
      state.getCartPending = false;
      state.userCartItems = action.data;
      break;
    case FETCH_CART_ERROR:
      state.getCartPending = false;
      break;
    case UPDATE_CART_ITEM_PENDING:
      state.updateCartItemPending = true;
      break;
    case UPDATE_CART_ITEM_SUCCESS:
      state.updateCartItemPending = false;
      state.updateCartResponse = action.data;
      break;
    case UPDATE_CART_ITEM_ERROR:
      state.updateCartItemPending = false;
      break;
    case DELETE_CART_ITEM_PENDING:
      state.deleteCartItemPending = true;
      break;
    case DELETE_CART_ITEM_SUCCESS:
      state.deleteCartItemPending = false;
      state.deleteCartItemResponse = action.data;
      break;
    case DELETE_CART_ITEM_ERROR:
      state.deleteCartItemPending = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default SHOPPING_CART_REDUCERS;
