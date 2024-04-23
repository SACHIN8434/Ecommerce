import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = ({children}) => {

    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    if(token !== null){
        return children
    }else{
        navigate("/login")
    }
  return (
    <div></div>
    
  )
}

export default PrivateRoute