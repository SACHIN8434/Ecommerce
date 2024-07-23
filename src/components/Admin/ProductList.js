import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../services/operations/product";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { GridDeleteIcon } from "@mui/x-data-grid";
import {deleteProduct} from "../../services/operations/product";
import {toast} from "react-hot-toast"

const ProductList = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.product);
 
  const { token } = useSelector((state) => state.auth);
 const [loading,setLoading] = useState(true)

 const handleDeleteProduct = async(id)=>{
  setLoading(true);
  const res = await deleteProduct(id,token);
  if(res){
    toast.success("Product deleted Successfully");
  }
  setLoading(false);
 }
  useEffect(() => {
    setLoading(true);
      async function products(){
      try {
        const res = getAdminProducts(token, dispatch);
        setLoading(false);
      } catch (e) {
        alert("Error occured while fetching adming products");
      }
    };
    products();
  },[dispatch,loading]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minwidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "stock",
      type: "number",
      minwidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      minwidth: 270,
      flex: 0.6,
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
              to={`/admin/product/${params.api.getCellValue(params.id, "id")}`}
            >
              <MdOutlineEdit/>
            </Link>
            <button onClick={()=>handleDeleteProduct(params.api.getCellValue(params.id, "id"))}>
              <GridDeleteIcon />
            </button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  adminProducts && 
  adminProducts.forEach((item)=>{
    rows.push({
      id:item._id,
      stock:item.stock,
      price:item.price,
      name:item.name,
    })
  })

  return (
    <>
      {
        loading?(<div>loading...</div>):
        (<div>
          <div className="grid grid-cols-[1fr,5fr]">
        <Sidebar />
        <div>
          <h1>All Products</h1>
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
        </div>)
      }
    </>
  );
};

export default ProductList;
