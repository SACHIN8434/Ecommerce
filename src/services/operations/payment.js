import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";

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
    totalAmount
){
    console.log("token is",token);
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
        
        toast.dismiss(toastId);



    }catch(e){
        console.log("Error occuered in buyProduct function");

    }
}