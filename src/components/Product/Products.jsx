import React, { Fragment } from "react";
import Product from "../Homepage/Product";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../slices/productSlice";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../services/operations/product";
import Pagination from "react-js-pagination";
import "./Products.css";
import { Slider, Typography } from "@mui/material";

const categories = ["Laptop", "T-shirt", "Camera", "SmartPhones","Shoes"];

const Products = () => {
  const { keyword } = useParams();
  console.log("this is keyword ", keyword);

  const [loading, setLoading] = useState(false);
  const [resultPerPage, setresultPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [price, setPrice] = useState([0, 250000]);
  const [filterProductCount, setFilterProductCount] = useState(null);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newprice) => {
    setPrice(newprice);
  };
  useEffect(() => {
    setLoading(true);

    const getProducts = async () => {
      const res = await getAllProducts(keyword, currentPage, price, category);
      console.log("res is", res);
      dispatch(setProduct(res.products));
      setresultPerPage(res.resultPerPage);
      setProductsCount(res.productCount);
      setFilterProductCount(res.filteredProductsCount);

      setLoading(false);
    };
    getProducts();
  }, [keyword, currentPage, price, category]);

  let products = useSelector((state) => state.product);
  let count = filterProductCount;
  products = products.product;
  console.log("resultPerPageIs", resultPerPage);
  console.log("productCount", productsCount);
  console.log("currentPageIs", currentPage);
  

  return (
    <Fragment>
      {/* <h1>Products</h1> */}

      <div className="flex mt-12">
        <div className="md:w-[15vw] w-[30vw] ml-4  bg-slate-300 text-slate-700 fixed left-5 h-[40vh]">
          <Typography className="text-3xl text-center font-sans font-medium">
            Price
          </Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={250000}
          />
          <Typography className="text-center">Categories</Typography>
          <div className="h-[3px] bg-black"></div>

          <ul className="p-0 flex flex-col gap-3 justify-center items-center mt-5">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setCategory(category)}
                className="cursor-pointer transition-all duration-75 hover:text-slate-400"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-row flex-wrap justify-center gap-12 mr-2 md:ml-[300px] ml-[100px]">
              {products?.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            itemsCountPerPage={resultPerPage}
            activePage={currentPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
