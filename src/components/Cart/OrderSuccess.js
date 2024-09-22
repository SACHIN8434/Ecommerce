import React from 'react'
import {Link} from "react-router-dom"
const OrderSuccess = () => {
  return (
    <>
    <div class="flex justify-center items-center bg-slate-300">
    <h1 className='text-4xl text-slate-800'>Orderrder is created</h1>
    <Link to={"/user/orders"}>View orders</Link>
    </div>
    </>
    
  )
}

export default OrderSuccess