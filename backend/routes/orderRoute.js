const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');



//import routes

router.post("/createOrder",isAuthenticatedUser,createNewOrder)

router.post("/getSingleOrder/:id",isAuthenticatedUser,getSingleOrder)

router.post("/myOrders",isAuthenticatedUser,myOrders)
module.exports = router;



//in the last
//get all orders->admin
router.post("/admin/getAllOrders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

// update order
router.post("/admin/updateOrder/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder);

//delete order
router.post("/admin/deleteOrder",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

