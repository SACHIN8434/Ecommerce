import React,{Fragment} from 'react'
import {useSelector} from 'react-redux'
import ProductCart from './ProductCart';

const Cart = () => {

    const cartData = useSelector((state)=>state.cart);
    const products = cartData.cart;
    console.log("products in cart index.jsx me",products);
   

  return (
    <Fragment>
    <div className='w-[80vw] mx-auto'>
    <div className="bg-cyan-300 ">
      <ul className='flex flex-row flex-wrap items-center justify-evenly'>
        <li>Product</li>
        <li>qunatity</li>
        <li>amount</li>
      </ul>
    </div>
    </div>
    {
      products.map((item,index)=>(
        <ProductCart product={item} key={index}/>
      ))

    }

    <div className='text-end mr-[13vw]'>Total Amount {cartData.total}</div>
    <div className='text-end mr-[13vw]'>Total Item {cartData.totalItems}</div>

    </Fragment>

    
  )
}

export default Cart