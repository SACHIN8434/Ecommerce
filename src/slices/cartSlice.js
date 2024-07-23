import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    quantity: localStorage.getItem("quantity") ? JSON.parse(localStorage.getItem("quantity")) : 1,
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            

            console.log("productData in cartSlice is product and quantity", product);
            const index = state.cart.findIndex((item) => item._id === product._id)

            if (index >= 0) {
                //if the product is already exist in the cart do not modify the cart
                toast.error("product is already in the cart")
                return;
            }

            //if the product is not in the cart add it into the cart
            state.cart.push(product);

            state.totalItems++;
            state.total = state.total + product.price;

            //now we have to update the localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart))

            localStorage.setItem("total", JSON.stringify(state.total));

            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

        },
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if (index >= 0) {
                // If the course is found in the cart, remove it
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
            }
        },
        saveShippingInfo(state,action){
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo",JSON.stringify(state.shippingInfo));
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },

    }
})

export const { addToCart, removeFromCart,saveShippingInfo,resetCart} = cartSlice.actions
export default cartSlice.reducer;