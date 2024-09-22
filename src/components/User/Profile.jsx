import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  //loading add krna hai agar user ka data nahi milega to

  const { user } = useSelector((state) => state.profile);
  return (
    <Fragment>
      <div className="bg-slate-300 flex flex-col flex-wrap items-center justify-center gap-5 mt-5 text-start">
        <div>
          <h1 className="text-2xl text-center font-sans font-medium">
            My Profile
          </h1>
          <img src={user.avatar.url} alt={user.name} />
          <Link to={"/user/updateprofile"} className=" text-lg font-sans font-medium">Edit Profile</Link>
        </div>

        <div>
          <h4>Full Name : <span>{user.name}</span></h4>
          
        </div>

        <div>
          <h4>Email : <span>{user.email}</span></h4>
        </div>
        <div className="flex flex-row flex-wrap justify-between items-center gap-4">
          <Link to={"/user/orders"} className="bg-slate-100 border-2 border-slate-800 text-blue-800 font-sans font-medium">My orders</Link>
          <Link to={"/user/password/update"}  className="bg-slate-100 border-2 border-slate-800 text-blue-800 font-sans font-medium">Change Password</Link>
        </div>
        <div>
          <Link to={"/user/updateProfile"}>Update Profile</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
