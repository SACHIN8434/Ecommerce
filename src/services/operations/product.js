import { productEndpoints } from "../apis";

import {apiConnector} from "../apiConnector";

const {GET_PRODUCT_API,GET_PRODUCT_DETAILS_API} = productEndpoints;

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