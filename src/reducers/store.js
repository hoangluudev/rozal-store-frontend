import { combineReducers } from "redux";

import USER_AUTH_REDUCERS from "./userauth.reducer";
import USER_PROFILE_REDUCERS from "./client/userProfile.reducer";
import PRODUCTS_REDUCERS from "./products.reducer";
import PRODUCT_DETAIL_REDUCERS from "./productDetail.reducer";
import SHOPPING_CART_REDUCERS from "./client/shoppingCart.reducer";
import ADDRESS_REDUCERS from "./client/address.reducer";
import USERS_ADMIN_REDUCERS from "./admin/userManagement.reducer";
import PRODUCTS_ADMIN_REDUCERS from "./admin/productManagement.reducer";
import ORDERS_ADMIN_REDUCERS from "./admin/orderManagement.reducer";
import ADMIN_DASHBOARD_REDUCERS from "./admin/dashboard.reducer";
import CATEGORY_ADMIN_REDUCERS from "./admin/category.reducer";
import PRODUCT_ALPHA_ADMIN_REDUCERS from "./admin/product.reducer";
import IMAGES_REDUCERS from "./uploadImage.reducer";
import PRODUCT_ALPHA_REDUCERS from "./client/product.reducer";
import ORDER_ALPHA_REDUCERS from "./client/orderAlpha.reducer";

const rootReducer = combineReducers({
  USER_AUTH_REDUCERS,
  USER_PROFILE_REDUCERS,
  PRODUCT_ALPHA_REDUCERS,
  PRODUCTS_REDUCERS,
  PRODUCT_DETAIL_REDUCERS,
  SHOPPING_CART_REDUCERS,
  ADDRESS_REDUCERS,
  USERS_ADMIN_REDUCERS,
  PRODUCTS_ADMIN_REDUCERS,
  PRODUCT_ALPHA_ADMIN_REDUCERS, 
  ORDERS_ADMIN_REDUCERS,  
  ORDER_ALPHA_REDUCERS,
  ADMIN_DASHBOARD_REDUCERS,
  CATEGORY_ADMIN_REDUCERS,
  IMAGES_REDUCERS,
});

export default rootReducer;
