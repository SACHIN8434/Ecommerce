const mongoose = require("mongoose");
const User = require("./UserModel");

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please enter the description"],
        trim:true,
    },
    price:{
        type:Number,
        required:[true,"Please enter the price"],
        maxLength:[8,"Price cannot exceed 8 length"],
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],

    category:{
        type:String,
        required:[true,"Please enter the product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 length"],
        default:1
    },
    noOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model("Product",ProductSchema);