import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading:false,
    orders:localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):null,
    singleOrderDetails:localStorage.getItem('singleOrderDetails')?JSON.parse(localStorage.getItem('singleOrderDetails')):null,
    adminOrders:[],
    deleteOrder:null,
}
const orderSlice = createSlice({
    name:"order",
    initialState:initialState,
    reducers:{
        setMyOrders(state,value){
            state.orders = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setSingleOrderDetails(state,value){
            state.singleOrderDetails = value.payload;
        },
        allOrdersReducer(state,value){
            state.adminOrders = value.payload;
        },
        deleteOrder(state,value){
            state.deleteOrder = value.payload;
        }
    }

})

export const{setMyOrders,setLoading,setSingleOrderDetails,allOrdersReducer,deleteOrder} = orderSlice.actions;
export default orderSlice.reducer;

