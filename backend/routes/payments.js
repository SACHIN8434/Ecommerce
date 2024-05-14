const express = require('express');
const router = express.Router();
const { capturePayment, verifyPayment } = require("../controllers/payment");
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');



router.post("/capturePayment",isAuthenticatedUser,capturePayment);
router.post("/verifypayment",isAuthenticatedUser,verifyPayment);

module.exports = router;