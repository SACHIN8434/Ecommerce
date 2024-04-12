const ErrorHandler = require("../utils/errorHandler");

const error = (err,req,res,next)=>{

    err.statusCode =  500;
    err.message =  "Internal server error";

    res.status(677).json({
        success:false,
        error:err,
    });
}

module.exports = error;