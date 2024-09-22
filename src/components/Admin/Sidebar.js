import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="border-r-4 h-[100%] flex flex-col items-center gap-y-5 text-center font-sans font-medium bg-slate-400">
        <Link>Dashboard</Link>
        <div>
          <div>
            <Link to={"/admin/products"}>Products</Link>
          </div>
          <div>
            <Link to={"/admin/product"}>Create Product</Link>
          </div>
        </div>
        <div>
          <Link to={"/admin/orders"}>Orders</Link>
        </div>
        <div>
          <Link to={"/admin/users"}>Users</Link>
        </div>
        <div>
          <Link>Reviews</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
