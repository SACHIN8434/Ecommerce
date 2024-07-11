import { orderEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setMyOrders } from "../../slices/orderSlice";
import {setSingleOrderDetails} from "../../slices/orderSlice";
import {resetCart} from "../../slices/cartSlice";
const {
    CREATE_ORDER,
    MY_ORDER,
    GET_SINGLE_ORDER_DETAILS
} = orderEndPoints;

export const createOrder = async (order, token, navigate,dispatch) => {
    try {
        const response = await apiConnector("POST", CREATE_ORDER, {
            order,
            token,
        })
        console.log("order creation response is", response);
        if (response.status === "success") {
            alert("order is created successfully");
            dispatch(resetCart);

        }
        navigate("/success");
    } catch (err) {
        alert("order is not created successfully")
    }
}


export const myOrders = async (dispatch, token) => {
    try {
        const response = await apiConnector("POST", MY_ORDER, {
            token,
        })
        console.log("my orders response api", response);
        if (response.data.status === "success") {
            dispatch(setMyOrders(response.data.orders))
        }
        return true;
    } catch (error) {
        alert("Error in myOrders api");
        return false;
    }
}
export const getSingleOrderDetails = async (token,id,dispatch) => {
    try {
        console.log("comming in getSingleOrderDetails");
        const link = GET_SINGLE_ORDER_DETAILS + "/" + `${id}`
        console.log("link is",link);
        const response = await apiConnector("POST", link, {
            token,
        })
        console.log("get single order details", response);
        if (response.data.success === true) {
            console.log("heelo");
            dispatch(setSingleOrderDetails(response.data.order))
        }
    } catch (error) {
        alert("Error in myOrders api");
        return false;
    }
}

// export const getSingleOrderDetails = async(token,)