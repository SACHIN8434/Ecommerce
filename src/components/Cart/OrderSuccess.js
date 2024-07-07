import React from 'react'
import {Link} from "react-router-dom"
const OrderSuccess = () => {
  return (
    <>
    <div class="flex justify-center items-center">
    <h1>Order is created</h1>
    <Link to={"/orders"}>View orders</Link>
    </div>
    </>
    
  )
}

export default OrderSuccess