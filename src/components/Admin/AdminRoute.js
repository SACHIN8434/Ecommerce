import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminRoute = () => {

    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    if(token !== null && user.role === 'admin'){
        return <Outlet/>
    }else{
       return <Navigate to={"/login"}></Navigate>
    }
  return (
    <div>404 page not found</div>
    
  )
}

export default AdminRoute