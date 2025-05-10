import { combineReducers } from "redux";
import adminCategoryReducer from "./category";
import adminDashboardReducer from "./dashboard";
import orderManagementReducer from "./order/orderManagementReducer";
import productManagementReducer from "./product/productManagementReducer";
import userManagementReducer from "./user/userManagementReducer";
import locationReducer from "./thirdParty/locationReducer";
import orderReducer from "./order/orderReducer";
import productReducer from "./product/productReducer";
import shoppingCartReducer from "./shoppingCart";
import currentUserReducer from "./user/currentUserReducer";
import uploadImageReducer from "./uploadImageReducer";
import userAuthReducer from "./userAuthReducer";
import productRatingReducer from "./rating";

const rootReducer = combineReducers({
  adminCategoryReducer,
  adminDashboardReducer,
  orderManagementReducer,
  productManagementReducer,
  userManagementReducer,
  locationReducer,
  orderReducer,
  productReducer,
  shoppingCartReducer,
  currentUserReducer,
  uploadImageReducer,
  userAuthReducer,
  productRatingReducer,
});

export default rootReducer;
