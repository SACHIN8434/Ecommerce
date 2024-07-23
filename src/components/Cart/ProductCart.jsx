import React from 'react'
import { removeFromCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductCart = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  console.log("product in product cart is",product);
  const remove = (productid)=>{
    console.log("product id is",productid);
  }

  const handleCheckOut = ()=>{
    // if(token){
    //   navigate("/account");
    // }else{
    //   navigate("/login");
    // }
    navigate("/login?redirect=shipping")
    
  }
  return (
    <>
      <div className='w-11/12 mx-auto flex flex-row items-center justify-evenly ml-2'>
        <div className='flex md:flex-row flex-col '>
          {/* section1 */}
          <div>
          <img src={product.images[0].url} className="h-[100px]"></img>
          </div>
          <div>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>Reviews {product.noOfReviews}</p>
          <p>Ratings {product.ratings}</p>
          </div>
        </div>
        <div>this is product quantity {product.quantity}</div>
        <div>
          {product.price}
        </div>
        <p className='text-red-500 cursor-pointer' onClick={()=>dispatch(removeFromCart(product._id))}>Remove</p>
        <p onClick={handleCheckOut}>CheckOut</p>
      </div>
    </>
  )
}

export default ProductCart