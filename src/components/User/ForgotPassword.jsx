import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import {forgotPassword} from "../../services/operations/auth"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
  })
  const {email} = formData


  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(formData.email)
    dispatch(forgotPassword(formData.email));
  }
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div>
    <p>hello</p>
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
        
          <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Signup
        </button>

      </form>
    </div>
  )
}

export default ForgotPassword