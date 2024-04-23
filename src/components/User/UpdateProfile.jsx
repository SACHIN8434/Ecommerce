import React,{useState} from 'react'
import {updateProfile} from "../../services/operations/auth"
import {useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password } = formData
  const {token} = useSelector((state)=>state.auth);


  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(formData.email," ",formData.password)
     dispatch(updateProfile(formData.password,formData.email,navigate,token));

     
  }
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
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
              Enter name which you want to change <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
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

export default UpdateProfile