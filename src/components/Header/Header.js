import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
import logo from '../../images/logo.png'

const Header = () => {
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="z-10 mb-[100px]">
      <div className="hidden md:block bg-slate-100 items-center shadow-md fixed top-0 left-0 right-0">
        <nav className="flex justify-evenly items-center">
          <div className="text-center text-2xl font-semibold">
            <a href="/" className="cursor-pointer">
             <img src={logo} alt="E-commerece" className="md:w-[8vw] rounded-lg"/>
            </a>
          </div>

          <ul className="flex flex-row gap-x-12 font-medium">
            <div className="flex flex-row gap-x-2">
              <Link to={"/"}>
                <li className="hover:text-red-500 cursor-pointer">Home</li>
              </Link>
              <Link to={"/products"}>
                <li className="hover:text-red-500 cursor-pointer">Product</li>
              </Link>
            </div>
            <div className="flex flex-row gap-x-2 cursor-pointer">
              <li className="hover:text-red-500 cursor-pointer">Contact</li>
              <li className="hover:text-red-500 cursor-pointer">About</li>
            </div>
          </ul>
          <div className="flex flex-row gap-x-5 items-center justify-center">
            <Link to={"/search"}>
              <FaSearch size={25} className="cursor-pointer" />
            </Link>

            <Link to={"/cart"}>
              <FiShoppingBag size={25} className="cursor-pointer" />
            </Link>

            {token === null && (
              <div className="flex flex-row flext-wrap items-center gap-4">
                <Link to={"/login"}>
                  <div className="text-slate-300 bg-slate-700 font-sans font-medium border border-slate-700 rounded-md w-[5vw] h-[5vh] flex items-center justify-center shadow-2xl flex-wrap">Login</div>
                </Link>
                <Link to={"/signup"}>
                  <div  className="text-slate-300 bg-slate-700 font-sans font-medium border border-slate-700 rounded-md w-[5vw] h-[5vh] flex items-center justify-center shadow-2xl flex-wrap">SignUp</div>
                </Link>
              </div>
            )}

            {<ProfileDropDown />}
          </div>
        </nav>
      </div>

      <div className="md:hidden  bg-slate-100 items-center shadow-md fixed top-0 left-0 right-0">
        <div className="flex flex-row justify-between">
          <div className="flex">
            <div onClick={() => setOpen(!open)}>
              {open ? (
                <button className="mr-4">
                  <RxCross1 fontSize={24} color="black" />
                </button>
              ) : (
                <button className="mr-4">
                  <AiOutlineMenu fontSize={24} color="black" />
                </button>
              )}
            </div>
            <div>
            <a href="/" className="cursor-pointer">
             <img src={logo} alt="E-commerece" className="w-[15vw] border border-white-100 rounded-lg"/>
            </a>
            </div>
          </div>
          <div className="flex flex-row gap-x-5 items-center justify-center">
            <Link to={"/search"}>
              <FaSearch size={25} className="cursor-pointer" />
            </Link>

            <Link to={"/cart"}>
              <FiShoppingBag size={25} className="cursor-pointer" />
            </Link>

            {token === null && (
              <div className="flex flex-row flext-wrap items-center gap-3">
                <Link to={"/login"}>
                  <div  className="text-slate-300 bg-slate-700 font-sans font-medium border border-slate-700 rounded-md w-[15vw] h-[5vh] flex items-center justify-center shadow-2xl flex-wrap text-sm">Login</div>
                </Link>
                <Link to={"signup"}>
                  <div  className="text-slate-300 bg-slate-700 font-sans font-medium border border-slate-700 rounded-md w-[15vw] h-[5vh] flex items-center justify-center  flex-wrap text-sm">SignUp</div>
                </Link>
              </div>
            )}

            {<ProfileDropDown />}
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-800 text-slate-300 mt-12">
          <ul className="flex flex-col font-medium gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Link to={"/"}>
                <li className="hover:text-red-500 cursor-pointer">Home</li>
              </Link>{" "}
              <Link to={"/products"}>
                <li className="hover:text-red-500">Product</li>
              </Link>{" "}
            </div>
            <div className="flex flex-col gap-y-2">
              <li className="hover:text-red-500 cursor-pointer">Contact</li>
              <li className="hover:text-red-500 cursor-pointer">About</li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
