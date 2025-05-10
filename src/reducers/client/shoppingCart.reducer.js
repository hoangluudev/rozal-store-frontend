import {
  CREATE_CART_ITEM_PENDING,
  CREATE_CART_ITEM_SUCCESS,
  CREATE_CART_ITEM_ERROR,
  FETCH_CART_PENDING,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  PATCH_CART_ITEM_PENDING,
  PATCH_CART_ITEM_SUCCESS,
  PATCH_CART_ITEM_ERROR,
  DELETE_CART_ITEM_PENDING,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_ERROR,
} from "../../constants/client/shoppingCart.constant";

const initialState = {
  createCartItemPending: false,
  fetchCartItemPending: false,
  updateCartItemPending: false,
  deleteCartItemPending: false,

  addCartItemSuccess: false,
  updateCartItemSuccess: false,

  userCartItems: [],
  userCartDataDropdown: [],
  userInactiveCartItems: [],
  totalItemCount: 0,
  totalPage: 0,
  currentPage: 1,
  selectedCount: 0,

  cartBillings: {
    subTotalAmount: 0,
    productDiscountAmount: 0,
    totalSavedAmount: 0,
    totalAmount: 0,
  },
};

const SHOPPING_CART_REDUCERS = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CART_ITEM_PENDING:
      state.createCartItemPending = true;
      state.addCartItemSuccess = false;
      break;
    case CREATE_CART_ITEM_SUCCESS:
      state.createCartItemPending = false;
      state.addCartItemSuccess = true;
      break;
    case CREATE_CART_ITEM_ERROR:
      state.createCartItemPending = false;
      state.addCartItemSuccess = false;
      break;
    case FETCH_CART_PENDING:
      state.fetchCartItemPending = true;
      break;
    case FETCH_CART_SUCCESS:
      state.fetchCartItemPending = false;
      state.updateCartItemSuccess = false;
      {
        let dataObj = action.payload.data;
        state.userInactiveCartItems = dataObj.inactiveCartItems;

        state.userCartItems = dataObj.data;
        state.userCartDataDropdown = dataObj.userCartDataDropdown;
        state.totalItemCount = dataObj.totalItemCount;
        state.currentPage = dataObj.page;
        state.itemsPerPage = dataObj.itemsPerPage;
        state.totalPage = dataObj.totalPage;
        state.selectedCount = dataObj.selectedCount;
        state.cartBillings = dataObj.cartBillings;
      }
      break;
    case FETCH_CART_ERROR:
      state.fetchCartItemPending = false;
      state.updateCartItemSuccess = false;
      break;
    case PATCH_CART_ITEM_PENDING:
      state.updateCartItemPending = true;
      break;
    case PATCH_CART_ITEM_SUCCESS:
      state.updateCartItemPending = false;
      state.updateCartItemSuccess = true;
      break;
    case PATCH_CART_ITEM_ERROR:
      state.updateCartItemPending = false;
      break;
    case DELETE_CART_ITEM_PENDING:
      state.deleteCartItemPending = true;
      break;
    case DELETE_CART_ITEM_SUCCESS:
      state.deleteCartItemPending = false;
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
