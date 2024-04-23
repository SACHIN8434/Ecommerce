import React,{Fragment} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Profile = () => {

  //loading add krna hai agar user ka data nahi milega to

  const {user} = useSelector((state)=>state.profile);
  return (
    <Fragment>

    <div>
    <div>
      <h1>My Profile</h1>
      <img src={user.avatar.url} alt={user.name}/>
      <Link to={"/updateprofile"}>Edit Profile</Link>
    </div>

    <div>
      <h4>Full Name</h4>
      <p>{user.name}</p>
    </div>
     
     <div>
      <h4>Email</h4>
      <p>{user.email}</p>
     </div>
    <div>
      <Link to={"/orders"}>My orders</Link>
      <Link to={"/password/update"}>Change Password</Link>
    </div>
    <div>
      <Link to={"/updateProfile"}>Update Profile</Link>
    </div>
    </div>

    </Fragment>
  )
}

export default Profile