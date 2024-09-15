import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { getSingleOrderDetails } from "../../services/operations/order";
import { updateOrder } from "../../services/operations/order";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { shippingInfo, cart, total } = useSelector((state) => state.cart);
  console.log("cart in confirm order is", cart);
  const { user } = useSelector((state) => state.profile);
  const { singleOrderDetails } = useSelector((state) => state.order);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const { id } = useParams();
  useEffect(() => {
    console.log("comming to get single order details");
    setLoading(true);
    const getSingleOrder = async () => {
      const res = await getSingleOrderDetails(token, id, dispatch);
      setLoading(false);
    };
    getSingleOrder();
  }, [id]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("status", status);

    updateOrder(id, token, myForm);
  };

  return (
    <>
      <h1>Create Product</h1>
      <div className="grid grid-cols-[1fr,5fr]">
        <Sidebar />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex items-center justify-center bg-black flex-col text-white">
            <div>
              <div class="mt-5">
                <p class="text-3xl">Shipping Info</p>
                <div class="border 1px solid black my-1"></div>
                <p>Name : {user.name}</p>
                <p>Phone : {singleOrderDetails.shippingInfo.phoneNo}</p>
                <p>Address : {singleOrderDetails.shippingInfo.address}</p>
              </div>

              <div>
                <p class="text-3xl mt-5">Payment</p>
                {singleOrderDetails &&
                singleOrderDetails.paymentInfo.status === "success" ? (
                  <p>PAID</p>
                ) : (
                  <p>NOT PAID</p>
                )}
                <p>Amount : {singleOrderDetails.totalPrice}</p>
              </div>

              {/* orderStatus */}
              <div class="mt-5">
                <p class="text-3xl">Order Status</p>
                <p>{singleOrderDetails.orderStatus}</p>
              </div>
              <div>
                {singleOrderDetails &&
                  singleOrderDetails.orderItems.map((item, index) => {
                    return (
                      <>
                        <div className="flex flex-row gap-x-5">
                          <img
                            src={item.images[0].url}
                            alt="product Image"
                            className="h-[100px]"
                          />
                          <span>{item.name}</span>

                          <p>
                            {item.quantity} X {item.price} ={" "}
                            {Number(item.price * item.quantity)}
                          </p>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>

            <div style={{display:singleOrderDetails.orderStatus === "Delivered"?"none":"block"}}>
              <form onSubmit={updateOrderSubmitHandler}>
                {/* category */}
                <div>
                  <label htmlFor="category">
                    category<sup className="text-pink-200">*</sup>
                  </label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    name="category"
                    id="category"
                    className="text-black"
                  >
                    <option>Choose Category</option>
                    {singleOrderDetails.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {singleOrderDetails.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                  className="text-white"
                >
                  Process
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProcessOrder;
