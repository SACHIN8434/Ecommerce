import React from 'react'
import profilePng from "../../images/Profile.png"
import {Rating} from "@mui/material"


const ReviewCard = ({review}) => {
  const options = {
    size: "small",
    value: review?.rating,
    readOnly:true,
    precision:0.5
  }

    
  return (
    <div className="border-2 md:w-[20vw] flex flex-col gap-y-3 items-center justify-center mt-5">
        <img src={profilePng} alt="user" className="md:w-[5vw] object-cover w-[50px]"/>
        <p>{review?.name}</p>
        <Rating {...options}/>
        <span className='text-center'>{review?.comment}</span>
    </div>
  )
}

export default ReviewCard