import React from 'react'
import { removeFromCart } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductCart = ({product}) => {
  const dispatch = useDispatch();
  console.log("product in product cart is",product);
  const remove = (productid)=>{
    dispatch(removeFromCart(productid));
    console.log("product id is",productid);
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

        <div>{product.quantity}</div>

        <div>
          {product.price}
        </div>
        <p className='text-red-500' onClick={remove(product._id)}>Remove</p>

      </div>
    </>
  )
}

export default ProductCart