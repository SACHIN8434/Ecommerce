import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { login } from "../../services/operations/auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split("=")[1] : "/myprofile";

  // useEffect(() => {
  //   if (token) {
  //     console.log("redirect is ", redirect);
  //     navigate(+ redirect);
  //     console.log(location);
  //   }
  // }, [location, redirect, dispatch, token]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { firstName, email, password } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData.email, formData.password, navigate));
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col bg-slate-300 m-auto">
      <form
        onSubmit={handleOnSubmit}
        className="flex items-center flex-col justify-center gap-10 bg-blue-500 border-blue-400 relative lg:w-[35vw] lg:h-[55vh] rounded-md shadow-2xl"
      >
        <label>
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-9 font-semibold">
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
              border: "1px solid black",
            }}
            className="lg:w-[30vw] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 m-auto"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5 text-richblack-9 font-semibold">
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
            className="lg:w-[30vw] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <div className="mb-0px flex flex-row justify-around items-center w-full text-center">
          <button
            type="submit"
            className="rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Login
          </button>
          <Link to={"/forgotpassoword"}>Forgot password</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
