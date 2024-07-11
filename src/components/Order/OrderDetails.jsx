import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getSingleOrderDetails } from '../../services/operations/order'
import {useState,useEffect} from "react";
import { Typography } from '@mui/material';


const OrderDetails = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {singleOrderDetails} = useSelector((state)=>state.order);

    const {id} = useParams();
    console.log("order id is",id);
    useEffect(()=>{
        setLoading(true);
        const getSingleOrder = async()=>{
            await getSingleOrderDetails(token,id,dispatch);
            console.log(singleOrderDetails);
            setLoading(false);
        }
        getSingleOrder();
    },[id,dispatch])
  return (
    <>
        <div>OrderDetails</div>
       { loading?(<div>Loading..</div>):(
            <div>hello</div>
        )}
        
    </>
    
  )
}

export default OrderDetails