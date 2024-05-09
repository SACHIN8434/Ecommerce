import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './CheckoutSteps';
import { Link, useNavigate } from "react-router-dom"
import { buyProduct } from '../../services/operations/payment';
import {toast} from "react-hot-toast"


const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const { shippingInfo, cart, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  console.log(shippingInfo, cart);
  let shippingCharges = 0;
  let totalAmount = 0;
  let subTotal = 0;
  cart.forEach(item => {
    subTotal += item.price * item.quantity;
    totalAmount = subTotal


  });
  let tax;

  const handlePayment = () => {
    const data = {
      tax,
      totalAmount,
      shippingCharges,
      subTotal,
    }
    console.log(data);
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/")

  }

  const handleBuyProduct = ()=>{
    if(token){
      buyProduct(token,cart,user,navigate,dispatch,totalAmount);
      return;
    }

    //koi bina login kiye huye sman khridna chah rha h 
    toast.error("Please Login");
  }

  return (
    <Fragment>
      <CheckoutSteps activeStep={1}></CheckoutSteps>

      {/* shippingInfo and cart items */}
      <div>
        {/* shippingInfo div */}
        <div>
          <h2>Shipping Information</h2>
          <p>Name : <span>{user.name}</span></p>
          <p>Phone : <span>{shippingInfo.phoneNo}</span></p>
          <p>Address : <span>{shippingInfo.address}</span></p>
        </div>

        {/* cart items wala div */}
        <div>
          {
            cart.map((item, index) => {
              return (
                <>
                  <div className="flex flex-row gap-x-5">

                    <img src={item.images[0].url} alt="product Image" className="h-[100px]" />
                    <span>{item.name}</span>

                    <p>{item.quantity} X {item.price} = {Number(item.price * item.quantity)}</p>
                  </div>
                </>
              )
            })
          }
        </div>

      </div>

      {/* //charges div*/}
      <div>
        <h2>Order Summery</h2>
        <p>Subtotal </p>
        <p>{totalAmount}</p>
        <p>Shipping Charges</p>
        <p>0</p>
        <p>GST:{tax = totalAmount * 18 / 100}</p>
        <p>Total : <span>{totalAmount = tax + totalAmount}</span></p>
       <button onClick={handleBuyProduct}>Proceed to pay</button>
      </div>


    </Fragment>
  )
}

export default ConfirmOrder