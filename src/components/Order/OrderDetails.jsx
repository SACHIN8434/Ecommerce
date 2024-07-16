import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getSingleOrderDetails } from '../../services/operations/order'
import {useState,useEffect} from "react";
import { Typography } from '@mui/material';
import ProductItem from './ProductItem';


const OrderDetails = () => {

    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile)
    
    const {id} = useParams();
    console.log("order id is",id);
    useEffect(()=>{
      console.log("comming to get single order details")
      setLoading(true);
        const getSingleOrder = async()=>{
        const res = await getSingleOrderDetails(token,id,dispatch);
        setLoading(false);
      }
      getSingleOrder();
    },[])
    const {singleOrderDetails} = useSelector((state)=>state.order);
    console.log("single order details is",singleOrderDetails);
  return (
    <>
        <h1 class='text-4xl'>Order Details</h1>
       { loading?(<div>Loading..</div>):(
            <>
              <div class='mt-5'>
                <p class='text-3xl'>Shipping Info</p>
                <div class='border 1px solid black my-1'></div>
                <p>Name : {user.name}</p>
                <p>Phone : {singleOrderDetails.shippingInfo.phoneNo}</p>
                <p>Address : {singleOrderDetails.shippingInfo.address}</p>
              </div>

              <div>
              <p class='text-3xl mt-5'>Payment</p>
              {singleOrderDetails.paymentInfo.status === 'success'?(<p>PAID</p>):<p>NOT PAID</p>}
              <p>Amount : {singleOrderDetails.totalPrice}</p>
              </div>

              <div class='mt-5'>
                <p class='text-3xl'>Order Status</p>
                <p>{singleOrderDetails.orderStatus}</p>
              </div>

              <div class='border 1px solid black'></div>

              <p class='text-3xl'>Order Items</p>
              {singleOrderDetails?.orderItems?.map((product)=>{
                return <ProductItem product={product}/>
              })}

            </>
        )}
        
    </>
    
  )
}

export default OrderDetails