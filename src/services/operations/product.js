import { productEndpoints } from "../apis";

import {apiConnector} from "../apiConnector";
import {newReviewReducer} from "../../slices/productSlice"
import { useDispatch } from "react-redux";

const {GET_PRODUCT_API,GET_PRODUCT_DETAILS_API,NEW_REVIEW} = productEndpoints;

export const getAllProducts = async(keyword="",currentPage=1,price=[0,25000],category)=>{
    let result = [];
    try{
        console.log("keyword in getAllProducts",keyword)
        console.log("price in getAllProducts",price[0])
        let link = `http://localhost:4000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

        if(category){
            link = `http://localhost:4000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const response = await apiConnector("GET",link);

        if(!response){
            throw new Error("Coutn Not fetch products");
        }
        console.log(response);
        
        result = response?.data;

    }catch(error){
        console.log("GET_ALL_PRODUCT_API ERROR............", error)
    }
    return result;
}


//get product details
export const getProductDetails = async(productId)=>{
    let result;
    try{
        console.log("productId in getProductDetails api is",productId);
        const response = await apiConnector("POST",GET_PRODUCT_DETAILS_API,{productId});
        result = response?.data;
    }catch(error){
        console.log("GET_PRODUCT_DETAILS_API_ERROR............", error)
    }
    return result;
}

export function newReview (obj,token){
    return async(dispatch)=>{
        try{
            console.log("comming in new Review ");
            const response = await apiConnector("PUT",NEW_REVIEW,{
                token,
                obj,
            })
            console.log("response from creating new review",response);
            if(response.data.success === true){
                dispatch(newReviewReducer(response.data.message));
            }
    
        }catch(e){
            alert("error in new review creation");
    
        }
    }
    
}