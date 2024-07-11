import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {createOrder} from "./order";
import { resetCart } from "../../slices/cartSlice"
import { useDispatch, useSelector } from 'react-redux'
const rzpLogo = "https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png?f=webp"


//load the razorpay sdk from the cdn
function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src =src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

//buy the course
export async function buyProduct(
    token,
    products,
    user_details,
    navigate,
    dispatch,
    totalAmount,
    order
){
    
    console.log("token is",token);
    console.log("products is",products);
    console.log("user details is",user_details);
    console.log("totalamount is",totalAmount);
    console.log("order is",order);
    
    console.log("updated order is",order);
    const toastId = toast.loading("Loading");
    try{
        console.log("We are enter into the buyProduct function");
        //loading the script ot razorpay sdk
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK faild to load. Check your internet connection");
            return;
        }

        //initialize the order in backend
        const orderResponse = await apiConnector(
            "POST",
            "http://localhost:4000/api/v1/payment/capturepayment",
            {
                products,
                token,
                totalAmount,
            }
        )    
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        else{

            console.log("Captuture payment response is", orderResponse);
        }

        toast.success("payment captured successfully");
        console.log("order id is",orderResponse.data.data.id)
        console.log("razorpay key is",process.env.RAZORPAY_KEY)


        //opening the razorpay sdk;
        const options = {
            key:"rzp_test_F35UfTSTDothFQ",
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"ecommerce",
            description:"Thank You for purchasing the product",
            image:rzpLogo,
            prefill:{
                name:`${user_details.name}`,
                email:`${user_details.email}`,
            },
            handler:function(response){
                verifyPayment({...response,products},token,navigate,dispatch,order)
                console.log("we are successfully reached to the verify payment");
            },
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        console.log("we succussfully till paymentObject.open");
        paymentObject.on("payment.failed",function(response){
            toast.error("oops,payment failed")
            console.log("error occured in paymentObject.on method",response.error);
        })
    }catch(e){
        console.log("PAYMENT API ERROR......",e);
        toast.error("could not make payment");

    }
    toast.dismiss(toastId);
}

async function verifyPayment(bodyData,token,navigate,dispatch,order){
    console.log("we are entre into the verify payment and body data is",bodyData);
    const toastId = toast.loading("verifying Payment...");
    try{
        const response = await apiConnector("POST", "http://localhost:4000/api/v1/payment/verifypayment",{bodyData,token})
        console.log("response from verify payment api is",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        //yha paymentId and paymentStatus aayega response me


        toast.success("payment succussful.");
        order.paymentInfo = {
            id:response.data.data.paymentId,
            status:response.data.data.paymentStatus,
        }
        
        if(response.data.success){
            toast.success("payment verify successfully");
            await createOrder(order,token,navigate,dispatch);
        }

    }catch(error){
        console.log("error in verify payment api",error);
        toast.error("could Not verify payment");
    }
    toast.dismiss(toastId);
}