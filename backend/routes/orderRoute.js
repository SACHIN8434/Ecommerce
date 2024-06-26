const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');



//import routes

router.post("/createOrder",isAuthenticatedUser,createNewOrder)

router.get("/getSingleOrder/:id",isAuthenticatedUser,getSingleOrder)

router.get("/myOrders",isAuthenticatedUser,myOrders)
module.exports = router;



//in the last
//get all orders->admin
router.get("/admin/getAllOrders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

// update order
router.put("/admin/updateOrder/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder);

//delete order
router.delete("/admin/deleteOrder/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

