

//--------styling baki hai---------

import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { myOrders } from '../../services/operations/order';
import {useState,useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom";
import { Typography } from '@mui/material';
import "./myOrders.css"


import LaunchIcon, { Launch } from "@mui/icons-material";

const Myorders = () => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {orders} = useSelector((state)=>state.order); 
    const {user} = useSelector((state)=>state.profile);

    const columns = [
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.3,
            cellClassName:(params)=>{
                return params.api.getCellValue(params.id,"status") == "Delivered"?"greenColor":"redColor";
            }
        },
        { 
            field:"itemsQty",
            headerName:"items Qty",
            type:"number",
            minWidth:150,
            flex:0.3,
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex:0.5,
        },
        {
            field:"actions",
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/orders/${params.api.getCellValue(params.id,"id")}`}>
                        <Launch></Launch>
                    </Link>
                )
            }
        }
    ];
    const rows = [];
    orders && orders.forEach((item,index)=>{
        rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
        })
    })
    useEffect(() =>{
        setLoading(true);
        const my = async()=>{
            console.log("comiing");
            const res = await myOrders(dispatch,token);
            setLoading(false);
        }
        my();
    },[]);
  return (
    <>
    <div>Myorders</div>
   {
    loading ? (<div>loading...</div>):
    (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                // disableRowSelectionOnClick
                autoHeight
            />
            <Typography>{user.name} orders</Typography>
        </div>
    )
   }

    </>
  )
}

export default Myorders