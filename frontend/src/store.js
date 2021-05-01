import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
} from "./redux/reducers/userReducers";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./redux/reducers/productReducers";


import {
  createOrderReducer,
  OrderDetailsReducer,
  OrderMyListReducer,
  OrderPaysReducer,
  OrderListDeleteReducer,
  OrderListReducer,
} from "./redux/reducers/orderReducers";

import {cartReducer}from './redux/reducers/cartReducers'


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userProfileUpdate: userUpdateProfileReducer,

  productList: productListReducer,
  producutDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  orderCreate: createOrderReducer,
  orderDetail: OrderDetailsReducer,
  userOrderList: OrderMyListReducer,
  orderedPay: OrderPaysReducer,
  orderDelete: OrderListDeleteReducer,
  ordersList: OrderListReducer,
  cart: cartReducer,
});

const cartItemFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userDetailsFromStorage = localStorage.getItem("userDetail")
  ? JSON.parse(localStorage.getItem("userDetail"))
  : [];

const shippingFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingFromLocalStorage,
  },
  userLogin: { userDetail: userDetailsFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
