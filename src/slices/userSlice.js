import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers:[],
    user:{},
}

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        allUsersReducer(state,value){
            state.allUsers = value.payload;
        },
        singleUser(state,value){
            state.user = value.payload;
        } 
    }
})

export const {allUsersReducer,singleUser} = userSlice.actions;
export default userSlice.reducer;