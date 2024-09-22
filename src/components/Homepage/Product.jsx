import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setLoading } from "../../slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@mui/material";

const Product = ({ product }) => {
  const options = {
    size: "small",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [loading, setLoading] = useState(false);
  return (
    <div className=" hover:scale-105 transition-all duration-75 delay-75 ease-out flex flex-col items-center text-center justify-center bg-slate-100">

      <Link to={`/product/${product._id}`}>
    <div className="flex items-center justify-center">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="object-contain lg:w-[15vw] lg:h-[30vh] text-center w-[30vw]"
        />
    </div>
        <p className="lg:w-[20vw] text-center">{product.name}</p>
        <div className="flex items-center justify-center flex-col">
          <Rating {...options} />
          <span>({`${product.noOfReviews}Reviews`})</span>
          <span>{`Rs. ${product.price} `}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
