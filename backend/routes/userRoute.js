const express = require('express');
const router = express.Router();

//import controllers
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require("../controllers/userController");

const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');


//create routes
router.post("/register", registerUser);
router.post("/login",loginUser)
router.post("/forgotPassword",forgotPassword)
router.post("/resetPassword",resetPassword)
router.get("/logout",logout)

router.get("/getUserDetails",isAuthenticatedUser,getUserDetails)

router.put("/updatePassword",isAuthenticatedUser,updatePassword)

router.put("/updateUserProfile",isAuthenticatedUser,updateUserProfile)

router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)

router.put("/admin/updateUserRole/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)

router.delete("/admin/deleteUser/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser)





module.exports = router;