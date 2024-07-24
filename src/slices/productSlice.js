import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    product:null,
    loading:false,
    newReview:null,
    adminProducts:null,
    newProduct:null,
    productDetails:{},
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct:(state,action)=>{
            state.product = action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        newReviewReducer:(state,action)=>{
            state.newReview = action.payload;
        },
        AdminProducts:(state,action)=>{
            state.adminProducts = action.payload;
        },
        newProductReducer:(state,action)=>{
            state.newProduct = action.payload;
        },
        oneProductDetails:(state,action)=>{
            state.productDetails = action.payload;
        }
    }
    
})

export const {
    setProduct,newReviewReducer,AdminProducts,newProductReducer,oneProductDetails
} = productSlice.actions

export default productSlice.reducer;