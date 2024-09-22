import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import {apiConnector} from "../apiConnector";
import { allUsersReducer } from "../../slices/orderSlice";
import { singleUser } from "../../slices/userSlice";
import toast from "react-hot-toast";

const {
    SIGNUP_API,
    LOGIN_API,
    GET_ALL_USERS,
} = authEndpoints;

export const signup = (firstName,lastName,email,password,navigate)=>{
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
            })
            console.log("signup response in api",response)
            if(!response){
                throw new Error(response.data.message)
            }

            navigate("/login");
           
        }catch(e){
            console.log("SIGNUP API ERROR............", e)
            navigate("/signup")
        }
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", LOGIN_API,{email,password});
            console.log("LOGIN API response............", response)
            if(!response.data.success){
                toast.error("Invalid email or password");
                alert("Invalid email or password")
                throw new Error(response.data.message)
            }

            console.log("LOGIN API response............", response.data.message)
            dispatch(setToken(response.data.token));
            dispatch(setUser({ ...response.data.user }))
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/user/myprofile");
        }catch(error){
            console.log("LOGIN API ERROR............", error)
            dispatch(setToken(null))
            localStorage.removeItem("token")
            localStorage.removeItem("user")
      dispatch(setUser(null))

        }
    }

}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/")
    }
  }

export function updateProfile(name,email,navigate,token){
    return async(dispatch)=>{

        try{
            // http://localhost:4000/api/v1/
    
            const response = await apiConnector("PUT","http://localhost:4000/api/v1/user/updateUserProfile",{name,email,token});
            console.log("updated user response",response);
            dispatch(setUser(response.data.user));
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/user/myprofile");
        }catch(error){
            console.log("update user api error............", error)
        }
    }

}

export  function forgotPassword(email,navigate){
    return async(dispatch)=>{

        try{
            console.log("email in forgot password",email)
    
            const response = await apiConnector("POST","http://localhost:4000/api/v1/user/forgotPassword",{email,});
            navigate("/")
    
        }catch(error){
            console.log("Error occured in forgot password api",error);
        }
    }
}

export const resetPassword = (password,confirmPassword,token)=>{

    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST","http://localhost:4000/api/v1/user/resetPassword",{password,confirmPassword,token});
            console.log("reset password api response",response);

        }catch(error){
            console.log("error occured in reset password api",error);
        }
    }
}

//get single user details(admin)
export const getSingleUser = (token,id)=>{

    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST",`GET_SINGLE_USER + "/" + ${id}`,{token,id});

            if(response.data.success === true){
                alert("all users fetched successfully");
                dispatch(allUsersReducer(response.data.users))
            }

        }catch(error){
            console.log(" GET ALL USERS api",error);
        }
    }
}
export const getAllUsers = (token)=>{

    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST",GET_ALL_USERS,{token});

            if(response.data.success === true){
                alert("all users fetched successfully");
                dispatch(singleUser(response.data.user))
            }

        }catch(error){
            console.log(" GET single USERS api",error);
        }
    }
}