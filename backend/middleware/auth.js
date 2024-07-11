const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        console.log("isAuthenticatedUser me aa gye hai")
        const { token } = req.body;

        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "please login to access this resource",
            })
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("decoded data is:",decodedData);
        req.user = await User.findById(decodedData.id);
        console.log("is authenticated se nikal chuka hai");
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "invalid user"
        })

    }
}

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(500).json({
                success:false,
                message:"Role: user is not allowed to access this resource",
            })
        }
        next();
    }
}

