import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import {login} from "../../services/operations/auth"
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'



const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  
  const {token} = useSelector((state)=>state.auth);
  const redirect = location.search?location.search.split("=")[1]:"/account";

  useEffect(()=>{
    if(token){
      console.log("redirect is ",redirect);
      navigate("/"+redirect);
      console.log(location);
    }
  },[location,redirect,dispatch,token])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  
  const { firstName,email, password } = formData
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()

      dispatch(login(formData.email,formData.password,navigate));
  }
    const [showPassword, setShowPassword] = useState(false)
  return (
    <div>
      <form onSubmit={handleOnSubmit}>

          <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Login
        </button>

      </form>

     <Link to={"/forgotpassoword"}>Forgot password</Link>
    </div>
  )
}

export default LoginForm