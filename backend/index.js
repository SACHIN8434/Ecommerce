const express  = require("express");
const app = express();
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
dotenv.config({path:"config/config.env"})

//database connect
connectDB();

// middlewaree
app.use(
    cors({
        origin:"*",
        credentials: true,
    })
)
app.use(express.json());
app.use(cookieParser());
// app.use(errorHandler);

//routes
app.use("/api/v1/product",productRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/order",orderRoute)


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