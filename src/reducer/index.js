import {combineReducers} from "@reduxjs/toolkit";


//import slices
import productReducer from "../slices/productSlice"

const rootReducer = combineReducers({
    product:productReducer,
});

export default rootReducer;