import {orderEndPoints} from "../apis";
import { apiConnector } from "../apiConnector";
const {CREATE_ORDER} = orderEndPoints;

export const createOrder = async (order,token,navigate)=>{
    try{
        const response = await apiConnector("POST",CREATE_ORDER,{
            order,
            token,
        })
        console.log("order creation response is",response);
        if(response.status === "success"){
            alert("order is created successfully");
        }
        navigate("/orders");
    }catch(err){
        alert("order is not created successfully")
    }
}