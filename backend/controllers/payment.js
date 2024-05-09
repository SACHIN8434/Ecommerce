const {instance} = require("../config/razorpay");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

const mongoose = require("mongoose");


//initiate the razorpay order
exports.capturePayment = async (req,res)=>{
    const {products,totalAmount} = req.body;
    const userId = req.user._id;
    if(products.length === 0){
        return res.status(404).json({
            success:false,
            message:"please provide products id length of product is zero",
        })
    }

    console.log("total products are",products);

    //->ye krne ki need nahi hain

    // for(const product_id of products){
    //     let product;
    //     try{
    //         //find the product by id
    //         product = await ProductModel.findById(product_id);
    //         console.log("one product is",product);

    //         if(!product){
    //             return res.status(404).json({
    //                 success:false,
    //                 message:"Couldn't find the product",
    //             })
    //         }

    //         //add the price of the product to the totalamount
    //         totalAmount +=product.price;

    //     }catch(error){
    //         console.log("Error occured in capture payment",error);
    //         return res.status(500).json({
    //             success:false,
    //             messsage:error.message,
    //         })
    //     }
    // }
    
    const options = {
        amount:totalAmount * 100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }
    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log("ekdam sahi h capture payment",paymentResponse);
        res.status(200).json({
            success:true,
            data:paymentResponse,
        })
    }catch(error){
        console.log("error occurred in initializing rezorpay payment",error);
        res.status(500).json({
            success:false,
            message:"Could't not initiate order",
        })
    }
}

exports.verifyPayment = async(req,res)=>{

}
