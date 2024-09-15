import { orderEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setMyOrders } from "../../slices/orderSlice";
import {setSingleOrderDetails} from "../../slices/orderSlice";
import {resetCart} from "../../slices/cartSlice";
import {allOrdersReducer} from "../../slices/orderSlice"
import toast from "react-hot-toast";
const {
    CREATE_ORDER,
    MY_ORDER,
    GET_SINGLE_ORDER_DETAILS,
    GET_ALL_ORDERS,
    DELETE_ORDER,
    UPDATE_ORDER
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
        return true;
    } catch (error) {
        alert("Error in myOrders api");
        return false;
    }
}

//get all orders(admin)
export const getAllOrders = async (token, dispatch) => {
    try {
        const response = await apiConnector("POST", GET_ALL_ORDERS, {
            token,
        })
        console.log("admin orders", response);
        if (response.data.success === true) {
            toast.success("order fetchted successfully");
            dispatch(allOrdersReducer(response.data.orders))
        }
        return true;
    } catch (error) {
        alert("Error in get all orders for admin api");
        console.log("Errr in get all orders api(admin)",error)
        return false;
    }
}

//update order(admin)
export const updateOrder = async (id,token,myForm) => {
    try {
        const link = UPDATE_ORDER + "/" + `${id}`

        const response = await apiConnector("POST", link,myForm,{
            "content-Type":"multipart/form-data",
            Authorisation:`Bearer ${token}`
          })
        console.log("order updation response is", response);
        if (response.data.success === true) {
            console.log("response from update order",response);
            alert("order is updated successfully");
            toast.success("order updated successfully");
        
        }
    } catch (err) {
        alert("order is not updated successfully")
        console.log(err);
    }
}


//delete order(admin)
export const deleteOrder = async (id, token,dispatch) => {
    try {
        const response = await apiConnector("POST", DELETE_ORDER, {
            token,
            id
        })
        console.log("delete order response only admin can delete", response);
       return response.data.success;
    } catch (err) {
        alert("Error in delete order");
        console.log(err);
        return false;
    }
}