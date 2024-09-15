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
    <div className="px-8 hover:scale-105 transition-all duration-75 delay-75 ease-out flex flex-col items-center text-center justify-center">
      <Link to={`product/${product._id}`}>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="object-contain w-[30vw] h-[50vh]"
        />
        <p className="w-[30vw] text-center">{product.name}</p>
        <div>
          <Rating {...options} />
          <span>({`${product.noOfReviews}Reviews`})</span>
          <span>{`$${product.price} `}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
