const Product = require("../models/ProductModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

//create Product only for admin
exports.createProduct = async (req, res) => {
  try {
    let imagesLinks = [];
    const images = req.files.files;
    console.log(images);
    console.log("req.files.files", req.files.files);
    console.log("images are,images");

    for (let i = 0; i < images.length; i++) {
      const result = await uploadImageToCloudinary(
        images[i],
        process.env.FOLDER_NAME
      );

      
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    console.log("imagesLinks are",imagesLinks);
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    console.log("req.body",req.body);
    const product = await Product.create(req.body);

    console.log("req.files are", req.files.files);
    console.log(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Error creating product", err);
    res.status(500).json({
      success: false,
      message: "error occured creating product",
    });
  }
};

//get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);
    //  products = await apiFeature.query;

    res.status(200).json({
      success: true,
      message: "products are fetched successfully",
      products,
      productCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (err) {
    console.log("Error while fetching all products", err);
    res.status(500).json({
      success: false,
      message: "error occured fetching all product",
    });
  }
};

//get product (Admin)
exports.getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "products are fetched successfully",
      products,
    });
  } catch (err) {
    console.log("Error while fetching all products", err);
    res.status(500).json({
      success: false,
      message: "error occured fetching all products",
    });
  }
};

//update product ->Admin
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const imagesLinks = [];
    if (req.files !== null) {
      const images = req.files.files;
      if (images !== undefined || images !== null) {
        for (let i = 0; i < images.length; i++) {
          const result = await uploadImageToCloudinary(
            images[i],
            process.env.FOLDER_NAME
          );

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
      req.body.images = imagesLinks;
    }
    let product = await Product.find({ _id: productId });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidation: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.log("Error while updating  product", err);
    res.status(500).json({
      success: false,
      message: "Error while updating  product",
    });
  }
};

//delete product ->Admin

exports.deleteProduct = async (req, res, next) => {
  try {
    console.log("comming to delete product");
    const productId = req.body.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    //dleting images from cloudinary ***add krna h ye

    // for(let i = 0;i<product.images.length;i++){
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    console.log("product not deleted successfully");
    await Product.findByIdAndDelete({ _id: productId });
    console.log("product deleted successfully");
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log("Error while deleting  product", err);
    res.status(500).json({
      success: false,
      message: "Error while deleting  product",
    });
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    console.log("Enter in getProductDetails controller");
    const { productId } = req.body;
    console.log("Enter in getProductDetails productId is", productId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const productDetails = await Product.findById({ _id: productId });

    return res.status(200).json({
      success: true,
      message: "Fetched user data successfully",
      productDetails,
    });
  } catch (err) {
    console.log("Error while fetching one  productDetails", err);
    res.status(500).json({
      success: false,
      message: "Error while fetching one  productDetails",
    });
  }
};

//create a review and update a review
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body.obj;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    console.log("review", review);
    console.log("product", product);
    console.log("req.user._id is", req.user._id);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log("isReviewed", isReviewed);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "review saved successfully",
    });
  } catch (err) {
    console.log("Error occured whilte giving reviews", err);
    res.status(500).json({
      success: false,
      message: "Error occured whilte giving reviews",
    });
  }
};

//get all reviews of a product
exports.getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.log("Error occured whilte fetching one product reviews", err);
    res.status(500).json({
      success: false,
      message: "Error occured whilte fetching one product reviews",
    });
  }
};

//delete revies

exports.deleteProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
      },
      {
        numOfReviews,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "reviews deleted successfully",
    });
  } catch (error) {
    console.log("Error occured whilte deleting  product reviews", error);
    res.status(500).json({
      success: false,
      message: "Error occured whilte deleting  product reviews",
    });
  }
};
