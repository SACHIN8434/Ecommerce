import React from "react";
import { removeFromCart } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("product in product cart is", product);
  const remove = (productid) => {
    console.log("product id is", productid);
  };

  const handleCheckOut = () => {
    if (token) {
      navigate("/user/shipping");
    } else {
      navigate("/login");
    }
    // navigate("/login?redirect=shipping")
  };
  return (
    <>
      <div className="w-11/12 mx-auto flex lg:flex-row flex-col items-center justify-evenly border border-b-2 mt-5">
        {/* section1 */}
        <div>
          <img src={product.images[0].url} className="h-[30vh] lg:w-[15vw]"></img>
          <p>{product.name}</p>
        </div>
        <div className="w-[50vw] mx-auto flex flex-col gap-3 font-sans">
          <div>
            <p className="texxt-2xl font-sans font-medium">Description</p>
            <p className="font-sans font-light">{product.description}</p>
          </div>
          <p>Reviews {product.noOfReviews}</p>
          <p>Ratings {product.ratings}</p>
          <div>Quantity : {product.quantity}</div>
          <div> Price : {product.price}</div>
          <div className="flex flex-row flex-wrap gap-5 font-medium font-sans">
            <p
              className="text-red-500 cursor-pointer"
              onClick={() => dispatch(removeFromCart(product._id))}
            >
              Remove
            </p>
            <p onClick={handleCheckOut} className="cursor-pointer text-green-700">CheckOut</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
