import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {

    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    if(token !== null){
        return <Outlet/>
    }else{
       return <Navigate to={"/login"}></Navigate>
    }
  return (
    <div>404 page not found</div>
    
  )
}

export default PrivateRoute