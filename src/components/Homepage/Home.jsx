import React, { Fragment } from 'react'
import Product from "./Product"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from "../../slices/productSlice"

import { getAllProducts } from '../../services/operations/product';
const product = {
  name: "Blue t-shirt",
  price: "$33",
  _id: "sachin",
  images: [{ url: "https://i.ibb.co/DRST11N/1.webp" }]
};




const Home = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    const getProducts = async () => {
      const res = await getAllProducts()
      console.log("home",res)
      dispatch(setProduct(res.products));
      setLoading(false);
    }
    getProducts();
  }, []);

  let products = useSelector((state) => state.product);
  products = products.product;

  return (

    <Fragment>
      <div>
        {
          loading ? (<div>Loading...</div>) : (<div className='flex flex-row flex-wrap justify-center lg:w-[90vw] mx-auto lg:gap-8 gap-5 overflow-hidden'>
            {
              products?.map((product, index) => (
                <Product product={product} key={index} />
              ))
            }
          </div>)
        }
      </div>
    </Fragment>
  )
}

export default Home