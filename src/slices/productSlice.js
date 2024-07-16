import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    product:null,
    loading:false,
    newReview:null,

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
        }
    }
    
})

export const {
    setProduct,newReviewReducer
} = productSlice.actions

export default productSlice.reducer;