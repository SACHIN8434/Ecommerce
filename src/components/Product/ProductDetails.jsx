import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { getProductDetails } from '../../services/operations/product';
import { useDispatch } from "react-redux"
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard';
import {toast} from "react-hot-toast"
import { addToCart } from '../../slices/cartSlice';


const ProductDetails = () => {

  const[quantity,setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Product id is:", id);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProductDetailsfun = async () => {
      setLoading(true);
      //function call for productDetails
      const res = await getProductDetails(id);
      console.log(res);
      setProductData(res?.productDetails);
      setLoading(false);
      toast.success("fetched product details successfully");
    }
    getProductDetailsfun();
  }, [id])
  console.log("productData is", productData);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    value: productData?.rating
  }

  const increateQuantity = ()=>{

    if(productData.stock<=quantity) return;
    setQuantity(quantity+1);
  }

  const decreaseQuantity = ()=>{
    if(quantity<=1) return;
    setQuantity(quantity-1);
  }

  const handleAddToCart = ()=>{
    //admin add to course nahi kr skta add krna hai
    console.log("jo productData bhej rhe h wo hai ye",productData);
    productData.quantity = quantity;
    dispatch(addToCart(productData));
  }

  return (



    <>

      {loading ? (<div>Loding...</div>) : (


        <div>

          <div className=' text-slate-300 pt-[20px] bg-slate-800'>
            <div className='flex md:flex-row flex-col md:w-11/12 md:gap-x-12 md:mx-auto' >
              <div className="md:w-1/2 w-full ">
              <div className='px-8 ml-8'>
                <Carousel>
                  {
                    productData?.images?.map((item, i) => (
                        <div className='px-8 rounded-lg'><img
                          className="object-fill  md:h-[500px] md:w-[400px] shadow-sm shadow-slate-400 w-[700px] h-[500px]"
                          key={item?.url}
                          src={item?.url}
                          alt={`${i}Slide`}
                        /></div>
                     
                    ))
                  }
                </Carousel>
                </div>

              </div>

              <div className="flex flex-col items-center justify-center gap-y-2 w-50%">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-4xl text-center">{productData?.name}</h2>
                  <p className="text-center">Product # {productData?._id}</p>
                </div>
                <div className="w-full h-[1px] bg-slate-300 mt-5">

                </div>
                <div className="flex md:flex-row items-center justify-center text-slate-300 flex-col text-center">
                  <ReactStars {...options} />
                  <span className='text-start'>({`${productData?.noOfReviews}Reviews`})</span>

                </div>
                <div className="w-full h-[1px] bg-slate-300 mt-5">

                </div>

                <div className="flex flex-col items-center justify-center gap-y-3">
                  <h1 className="text-4xl">{`$${productData?.price} `}</h1>
                  <div className="flex md:flex-row justify-center items-center md:gap-x-4 flex-col gap-y-3">
                    <div className="flex flex-row justify-center items-center ">
                      <button className="h-8 bg-slate-300 text-slate-800 w-10  text-4xl  text-center" onClick={decreaseQuantity}>-</button>
                      <input readOnly value={quantity} className="w-[40px] bg-slate-200 text-2xl  text-slate-900 text-center"/>
                      <button className="h-8 bg-slate-300 text-slate-800 w-8  flex items-center text-4xl justify-center" onClick={increateQuantity}>+</button>
                    </div>{" "}
                    <button className="bg-orange-600 rounded-full w-[100px] hover:transition-all duration-75 delay-75 ease-out h-8 hover:bg-orange-800" onClick={handleAddToCart}>Add to Cart</button>
                  </div>
                  <div className="w-full h-[1px] bg-slate-300 mt-5">

                  </div>
                  <p>
                    Status:{" "}

                    <b className={`${productData?.stock < 1 ? "text-red-500" : "text-green-500"}`}>{productData?.stock < 1 ? "OutOfStock" : "InStock"}</b>
                    <div className="w-full h-[1px] bg-slate-300 mt-5">

                    </div>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="md:text-4xl text-center">Description</p>
                  <p >{productData?.description}</p>
                </div>
                <button className="bg-orange-600 rounded-full w-[150px] hover:transition-all  ease-out h-8 hover:scale-105 transition-all duration-75 delay-75 ">Submit Review</button>
              </div>
            </div>


          </div>
          <h3 className="text-center mt-8 text-4xl">Reviews</h3>
          <div className='flex items-center justify-center'>

            <div className="w-[30vw] h-[1px] bg-slate-300 mt-2">
            </div>
          </div>

          {
            productData?.reviews && productData?.reviews[0] ? (
              <div className="flex overflow-auto">
                {
                  productData?.reviews.map((review,index) => (
                    <ReviewCard review={review} key={index}/>
                  ))
                }
              </div>
            ) : (
              <p className='text-center text-3xl text-slate-400 mt-5'>No Reviews Yet</p>
            )
          }





        </div>
      )}
    </>
  )

}

export default ProductDetails