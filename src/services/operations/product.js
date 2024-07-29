import { productEndpoints } from "../apis";

import { apiConnector } from "../apiConnector";
import { newReviewReducer } from "../../slices/productSlice";
import { useDispatch } from "react-redux";
import { AdminProducts } from "../../slices/productSlice";
import { TurnedIn } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { newProductReducer } from "../../slices/productSlice";
import {oneProductDetails} from "../../slices/productSlice";

const {
  GET_PRODUCT_API,
  GET_PRODUCT_DETAILS_API,
  NEW_REVIEW,
  ADMIN_PRODUCTS,
  CREATE_NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} = productEndpoints;

export const getAllProducts = async (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category
) => {
  let result = [];
  try {
    console.log("keyword in getAllProducts", keyword);
    console.log("price in getAllProducts", price[0]);
    let link = `http://localhost:4000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    if (category) {
      link = `http://localhost:4000/api/v1/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }

    const response = await apiConnector("GET", link);

    if (!response) {
      throw new Error("Coutn Not fetch products");
    }
    console.log(response);

    result = response?.data;
  } catch (error) {
    console.log("GET_ALL_PRODUCT_API ERROR............", error);
  }
  return result;
};

//get product details
export const getProductDetails = async(productId)=>{
  let result;
  try {
    const response = await apiConnector("POST", GET_PRODUCT_DETAILS_API, {
      productId,
    });
    result = response?.data;
    // dispatch(oneProductDetails(response.data));
  } catch (error) {
    console.log("GET_PRODUCT_DETAILS_API_ERROR............", error);
  }
  return result;
}
//get product details
export function getOneProductDetails(productId){
  return async(dispatch)=>{

    try {
      const response = await apiConnector("POST", GET_PRODUCT_DETAILS_API, {
        productId,
      });
        response?.data && dispatch(oneProductDetails(response.data.productDetails));
    } catch (error) {
      console.log("GET_PRODUCT_DETAILS_API_ERROR............", error);
    }
  }
}
  


export function newReview(obj, token) {
  return async (dispatch) => {
    try {
      console.log("comming in new Review ");
      const response = await apiConnector("PUT", NEW_REVIEW, {
        token,
        obj,
      });
      console.log("response from creating new review", response);
      if (response.data.success === true) {
        dispatch(newReviewReducer(response.data.message));
      }
    } catch (e) {
      alert("error in new review creation");
    }
  };
}

//admin products
export async function getAdminProducts(token, dispatch) {
  console.log("coming to getAdmin Products");
  try {
    const response = await apiConnector("POST", ADMIN_PRODUCTS, { token });
    console.log("response of getAdminProducts Api", response);
    dispatch(AdminProducts(response.data.products));
    return true;
  } catch (e) {
    alert("error in admin products fetching");
    return false;
  }
  return true;
}

// create new product
export const createProduct = (formData,token) => {
  return async (dispatch) => {
    try {
      console.log("productData is coming in create pr", formData);
      console.log("token is",token);

      const response = await apiConnector("POST", CREATE_NEW_PRODUCT,formData,{
        "content-Type":"multipart/form-data",
        Authorisation:`Bearer ${token}`
      }
      );
      console.log("response from createNewProduct Api", response);

      if (response.data.success === true) {
        toast.success("Product is Created Successfully");
        dispatch(newProductReducer(response.data.product));
      }
      return true;
    } catch (err) {
      toast.error("Error creating product");
      return false;
    }
    return true

  };
  return true
};

export const deleteProduct = async(id,token)=>{
  try{


    const res = await apiConnector("POST",DELETE_PRODUCT,{id},{
       "content-Type":"multipart/form-data",
          Authorisation:`Bearer ${token}`
    })
    if(res.data.success === true){
      return true;
    }
  }catch(error){
    toast.error("Error while deleting product");
    console.log("Error while deleting product",error);
    return false;
  }
}

export const updateProduct = async(id,token,formData)=>{
  try{
    const res = await apiConnector("PUT",`http://localhost:4000/api/v1/product/admin/updateProduct/${id}`,formData,{
      "content-Type":"multipart/form-data",
      Authorisation:`Bearer ${token}`
    })

    console.log("response from update product",res);
    if(res.status.success === true){
      toast.success("Product updated successfully");
    }
  }catch(error){
    console.log("Error while updating product api function",error);
    toast.error("Error while updating product");
  }
}
