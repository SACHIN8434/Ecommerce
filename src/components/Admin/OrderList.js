import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { deleteProduct } from "../../services/operations/product";
import { toast } from "react-hot-toast";
import { deleteOrder, getAllOrders } from "../../services/operations/order";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminOrders } = useSelector((state) => state.order);

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);


  //delete order
  const deleteOrderHandler = async (id) => {
    setLoading(true);
    const res = await deleteOrder(id, token);
    if (res) {
      toast.success("Order deleted Successfully");
      navigate("/admin/orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    async function products() {
      try {
        const res = getAllOrders(token, dispatch);
        setLoading(false);
      } catch (e) {
        alert("Error occured while fetching adming products");
      }
    }
    products();
  }, [dispatch, loading]);
  const columns = [
    {field:"id",headerName:"Order ID",minWidth:300,flex:1},
    {
        field:"status",
        headerName:"Status",
        minWidth:150,
        flex:0.3,
        cellClassName:(params)=>{
            return params.api.getCellValue(params.id,"status") == "Delivered"?"greenColor":"redColor";
        }
    },
    { 
        field:"itemsQty",
        headerName:"items Qty",
        type:"number",
        minWidth:150,
        flex:0.4,
    },
    {
        field:"amount",
        headerName:"Amount",
        type:"number",
        minWidth:270,
        flex:0.5,
    },
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minwidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="flex flex-row items-center justify-center gap-x-5">
              <Link
                to={`/admin/order/${params.api.getCellValue(
                  params.id,
                  "id"
                )}`}
              >
                <MdOutlineEdit />
              </Link>
              <button
                onClick={() =>
                  deleteOrderHandler(params.api.getCellValue(params.id, "id"))
                }
              >
                <GridDeleteIcon />
              </button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div className="grid grid-cols-[1fr,5fr]">
            <Sidebar />
            <div>
              <h1>All Orders</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                //  disableRowSelectionOnClick
                className="productListTable"
                autoHeight
              ></DataGrid>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
