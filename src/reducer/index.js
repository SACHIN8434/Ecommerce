import {combineReducers} from "@reduxjs/toolkit";


//import slices
import productReducer from "../slices/productSlice"
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import orderReducer from "../slices/orderSlice"

const rootReducer = combineReducers({
    product:productReducer,
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    order:orderReducer,
});

export default rootReducer;