import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice.js";
import authReducer from "../features/authSlice.js";
import productReducer from "../features/productSlice.js";
import cartReducer from "../features/cartSlice.js";
import checkoutReducer from "../features/checkoutSlice.js";
import orderSlice from "../features/orderSlice.js";
import adminSlice from "../features/adminSlice.js";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderSlice,
  admin: adminSlice,
});
