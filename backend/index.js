const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer  = require('multer')
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// const errorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")
const cors = require("cors");



//route import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");


//importing database
const connectDB = require("./config/database")
dotenv.config();
const paymentRoute = require("./routes/payments");

console.log( "RAZORPAY KEY IS",process.env.RAZORPAY_KEY);
//database connect
connectDB();

// middlewaree
app.use(
    cors({
        origin:"*",
        credentials: true,
    })
)





app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); // for JSON data


// app.use(errorHandler);

//routes
app.use("/api/v1/product",productRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);


//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your default route is running"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})