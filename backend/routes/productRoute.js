const express = require('express')
const router = express.Router();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("file in multer",file)
      cb(null, './public')
    },
    filename: function (req, file, cb) {
        console.log("coming to  multer");
      cb(null, file.fieldname + '-' + Date.now() +  uniqueSuffix + '-' + file.originalname)
    }
  })
  
 const upload = multer({ storage, })
//import the productController functions
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview, getProductReviews, deleteProductReview, getAdminProducts} = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


//routes
router.get('/getAllProducts',getAllProducts)
router.post('/admin/products',isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)
router.post("/admin/createProduct",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.put("/admin/updateProduct/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.post("/admin/deleteProduct",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.post("/getProductDetails",getProductDetails)

router.put("/review",isAuthenticatedUser,createProductReview)

router.get("/getProductReview",getProductReviews);
router.delete("/deleteReview",isAuthenticatedUser,deleteProductReview)

// /api/v1/product/admin/createproduct

//export router
module.exports = router;