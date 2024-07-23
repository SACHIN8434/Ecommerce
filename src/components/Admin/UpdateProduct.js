import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import {updateProduct,getOneProductDetails} from "../../services/operations/product"
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [oldImages,setOldImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    images: [],
  });
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [imagePreview, setImagePreview] = useState([]);

  const [images, setImages] = useState([]);
  //productId
  const {id} = useParams();
  console.log("id is",id);
  const {productDetails} = useSelector((state)=>state.product);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "phone",
    "charger",
  ];
  let num = 0;
  useEffect(()=>{
        if(productDetails && productDetails._id !== id){
            dispatch(getOneProductDetails(id,dispatch));
        }else{
            setProductName(productDetails.name);
            setDescription(productDetails.description);
            setPrice(productDetails.price);
            setCategory(productDetails.category);
            setStock(productDetails.stock);
            setOldImages(productDetails.images);
        }
      },[dispatch,getOneProductDetails]);


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("comming to handleonSubmit");
    const formData = new FormData();

    // console.log("formData is", formData);
    // formData.append("name", productName);
    // formData.append("price", price);
    // formData.append("description", description);
    // formData.append("category",category);
    // formData.append("stock", stock);
    // formData.append("images",images);
    console.log("images are",images);
    
    // formData.append("images",images);
    const myForm = new FormData();

    myForm.append("name", productName);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);
    console.log("images.length is",images.length);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    // myForm.append("images",images);
    for(let i = 0;i<images.length;i++){
      console.log(images[i]);
      myForm.append("files",images[i])
    }
    
   
     console.log("this is the object which we are sendig to the backend",formData);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          // setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (
    <>
      <h1>Create Product</h1>
      <div className="grid grid-cols-[1fr,5fr]">
        <Sidebar />
        <div className="flex items-center justify-center bg-black">
          <form onSubmit={handleOnSubmit}>
            {/*product name*/}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="productName">
                Product Name<sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* price */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="price">
                Product Name<sup className="text-pink-200">*</sup>
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter Product Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* description */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="description">
                Product Name<sup className="text-pink-200">*</sup>
              </label>
              <textarea
                type="text"
                id="description"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* category */}
            <div>
              <label htmlFor="category">
                category<sup className="text-pink-200">*</sup>
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                value={category}
                id="category"
              >
                <option>Choose Category</option>
                <option>"jai"</option>
                {categories.map((cate) => (
                  <option key={cate}>{cate}</option>
                ))}
              </select>
            </div>

            {/* stock */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="stock">
                stock<sup className="text-pink-200">*</sup>
              </label>
              <input
                type="number"
                id="stock"
                placeholder="Enter Product Stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* images */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="images">
                images<sup className="text-pink-200">*</sup>
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
                // value={images}
                // value=""
                
              />
            </div>

            <div className="overflow-auto flex w-[20vw]">
              {imagePreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Avatar preview"
                  className="w-[100px]"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading ? true : false}
              className="text-white"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
