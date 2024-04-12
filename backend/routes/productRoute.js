const express = require('express')
const router = express.Router();


//import the productController functions
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteProductReview} = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


//routes
router.get('/getAllProducts',getAllProducts)
router.post("/admin/createProduct",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.put("/admin/updateProduct/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete("/admin/deleteProduct/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.post("/getProductDetails",getProductDetails)

router.put("/review",isAuthenticatedUser,createProductReview)

router.get("/getProductReview",getProductReviews);
router.delete("/deleteReview",isAuthenticatedUser,deleteProductReview)

// /api/v1/product/admin/createproduct

//export router
module.exports = router;