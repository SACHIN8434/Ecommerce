import React, { useState } from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import {setLoading} from "../../slices/productSlice"
import {useSelector,useDispatch} from "react-redux"



const Product = ({product}) => {
    const options = {
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      value:product.rating,
      isHalf:true,
      size:window.innerWidth<600?20:25,
  }

  const [loading,setLoading] = useState(false);
  return (

    <div className="px-8 hover:scale-105 transition-all duration-75 delay-75 ease-out">
    <Link to={`product/${product._id}`} >
    <img src="https://images.unsplash.com/photo-1557244056-ac3033d17d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2V4eSUyMGdpcmx8ZW58MHx8MHx8fDA%3D "alt={product.name} className="object-cover h-[50vh]"/>
    <p>{product.name}</p>
    <div>
        <ReactStars {...options}/>
        <span>({`${product.noOfReviews}Reviews`})</span>
        <span>{`$${product.price} `}</span>
    </div>
    

    </Link>
    </div>
  )
}

export default Product