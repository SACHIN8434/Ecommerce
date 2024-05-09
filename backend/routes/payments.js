const express = require('express');
const router = express.Router();
const { capturePayment } = require("../controllers/payment");
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');



router.post("/capturePayment",isAuthenticatedUser,capturePayment);

module.exports = router;