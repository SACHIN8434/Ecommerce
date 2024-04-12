import React from 'react'
import profilePng from "../../images/Profile.png"
import ReactStars from "react-rating-stars-component"

const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
        value: review?.rating
      }
  return (
    <div className="border-2 md:w-[20vw] flex flex-col gap-y-3 items-center justify-center mt-5">
        <img src={profilePng} alt="user" className="md:w-[5vw] object-cover w-[50px]"/>
        <p>{review?.name}</p>
        <ReactStars {...options}/>
        <span className='text-center'>{review?.comment}</span>
    </div>
  )
}

export default ReviewCard