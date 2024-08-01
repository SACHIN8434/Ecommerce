const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");


//create new order
exports.createNewOrder = async(req,res,next)=>{
    try{
        console.log("Enter into the createNewOrder",req.body.order);
        const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body.order;
        
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id,
        });

        res.status(200).json({
            success: true,
            message:"Order created successfully",
            order,
        })

    }catch(error){
        console.log("Error occured during creating order successfully",error);
        res.status(500).json({
            success: false,
            message:"Error occured during creating order successfully",
            
        })

    }
}

//get single order
exports.getSingleOrder = async(req,res)=>{
    try{
        console.log("geSingleOrder me aa chuke hai");
        const order = await Order.findById(req.params.id).populate("user");

        if(!order){
            return res.status(401).json({
                success:false,
                message:"order not found",
            })
        }

        res.status(200).json({
            success:true,
            message:"order fetched successfuly",
            order,
        })

    }catch(error){
        console.log("Error arises in fetching order details",error);
        res.status(500).json({
            success: false,
            message:"Error arises in fetching order details",
            
        })
    }
}

//get logged in user orders
exports.myOrders = async(req,res)=>{
    try{
        console.log("comming in my orders");

        const orders = await Order.find({user:req.user._id})

        res.status(200).json({
            status:"success",
            orders,
            message:"orders fetched successfuly"
        })

    }catch(error){
        console.log("Error arises in fetching order details",error);
        res.status(500).json({
            status: "false",
            message:"Error arises in fetching order details",
            
        })
    }
}


//get All order ->Admin
exports.getAllOrders = async(req,res)=>{
    try{

        const orders = await Order.find(req.body.id);

        let totalAmount  = 0;
        orders.forEach((order)=>{
            totalAmount+=order.totalPrice;
        })

        res.status(200).json({
            success:true,
            message:"order fetched successfuly",
            orders,
            totalAmount,
        })

    }catch(error){
        console.log("orders not found",error);
        res.status(500).json({
            success: false,
            message:"Error arises in fetching all orders details",
            
        })
    }
}

//update order status-admin
exports.updateOrder = async(req,res)=>{
    try{

        const order = await Order.findById(req.body.id);
        if(!order){
            return res.status(401).json({
                success:false,
                message:"order not found",
            })
        }

        if(order.orderStatus === "Delivered"){
            return res.status(404).json({
                status:false,
                meessage:"You hava already this order"
            });
        }

        order.orderItems.forEach(async(o)=>{
            await updateStock(o.product,o.quantity)
        });

        order.orderStatus = req.body.status;

        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        };

        await order.save({validateBeforeSave:false})

        res.status(200).json({
            success:false,
            message:"order updated successfuly",
        })

    }catch(error){
        console.log("update order status-admin",error);
        res.status(500).json({
            success: false,
            message:"Error arises update order status-admin",
            
        })
    }
}

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false})
}


//delete order ->admin
exports.deleteOrder = async(req,res)=>{
    try{

        const order = await Order.findById(req.body.id);
        

        if(!order){
            return res.status(401).json({
                success:false,
                message:"order not found",
            })
        }

        await Order.findByIdAndDelete(req.body.id);

        res.status(200).json({
            success:true,
            message:"order deleted successffully"
        })

    }catch(error){
        console.log("error in deleting order",error);
        res.status(500).json({
            success: false,
            message:"error in deleting order",
            
        })
    }
}
