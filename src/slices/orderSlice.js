import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading:false,
    orders:localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):null,
}
const orderSlice = createSlice({

})

export default orderSlice.reducer;

