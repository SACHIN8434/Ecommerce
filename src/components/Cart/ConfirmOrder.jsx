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
  console.log("cart in confirm order is",cart);
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  console.log("shipping info and cart itms is",shippingInfo, cart);
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
      const order = {
        totalPrice: totalAmount,
        taxPrice:tax,
        shippingPrice:shippingCharges,
        itemPrice:subTotal,
        orderItems:cart,
        shippingInfo,
      }
      buyProduct(token,cart,user,navigate,dispatch,totalAmount,order);
        //create order into the database after payment is successful
      return;
    }

    //koi bina login kiye huye sman khridna chah rha h 
    toast.error("Please Login");
  }

  return (
    <div className='bg-slate-300 w-full mt-5 flex flex-col flex-wrap justify-center'>
    <div className='text-center text-3xl font-sans font-medium'>Shippping Details</div>
    <Fragment>
    <div className='mt-5'>
      <CheckoutSteps activeStep={1}></CheckoutSteps>
    </div>
    <div className='flex flex-wrap justify-around items-center flex-row w-[90vw] m-auto'>

      {/* shippingInfo and cart items */}
      <div className='mt-5 flex flex-col flex-wrap items-center justify-center gap-8'>
        {/* shippingInfo div */}
        <div className='mt-5 flex flex-col flex-wrap items-start justify-center gap-5 font-sans font-medium'>
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

                    <img src={item.images[0].url} alt="product Image" className="h-[15vh] w-[8vw]" />
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
      <div className='mt-5 flex flex-col items-center text-start justify-center gap-2 font-sans font-medium  m-auto'>
        <h2 className='text-2xl'>Order Summery</h2>
        <p>Subtotal :  <span>{totalAmount}</span></p>
       
        <p>Shipping Charges : <span>0</span></p>
       
        <p>GST:{tax = totalAmount * 18 / 100}</p>
        <p>Total : <span>{totalAmount = tax + totalAmount}</span></p>
       <button onClick={handleBuyProduct} className="bg-slate-200 text-green-900 font-sans font-bold">Proceed to pay</button>
      </div>
      </div>
    </Fragment>
    </div>

  )
}

export default ConfirmOrder