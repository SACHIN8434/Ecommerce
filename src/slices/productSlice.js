import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    product:null,
    loading:false,
    newReview:null,
    adminProducts:null,
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
        }
    }
    
})

export const {
    setProduct,newReviewReducer,AdminProducts
} = productSlice.actions

export default productSlice.reducer;