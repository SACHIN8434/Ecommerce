import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileDropDown from "./ProfileDropDown"

const Header = () => {
    const [open, setOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <div>

            <div className="hidden md:block">
                <nav className="flex justify-evenly">
                    <div className="text-center text-2xl font-semibold">
                        <a href="/" className='cursor-pointer'>Ecommerce</a>
                    </div>

                    <ul className="flex flex-row gap-x-12 font-medium">
                        <div className="flex flex-row gap-x-2">
                            <li className='hover:text-red-500 cursor-pointer'>Home</li>
                            <Link to={"/products"}>

                                <li className='hover:text-red-500 cursor-pointer'>Product</li>
                            </Link>
                        </div>
                        <div className="flex flex-row gap-x-2 cursor-pointer">
                            <li className='hover:text-red-500 cursor-pointer'>Contact</li>
                            <li className='hover:text-red-500 cursor-pointer'>About</li>
                        </div>
                    </ul>
                    <div className='flex flex-row gap-x-5'>

                        <Link to={"/search"}>

                            <FaSearch size={25} className='cursor-pointer' />
                        </Link>

                        <Link to={"/cart"}>

                        <FiShoppingBag size={25} className='cursor-pointer' />
                        </Link>


                        {
                            token === null && (<div><Link to={"/login"}>
                                <div>Login</div>
                            </Link>
                                <Link to={"signup"}>
                                    <div>SignUp</div>
                                </Link></div>)
                        }

                        {
                           <ProfileDropDown/>
                        }

                    </div>
                </nav>
            </div>

            <div className="md:hidden">
                <div className="flex flex-row justify-between">
                    <div onClick={() => setOpen(!open)}>
                        {
                            open ? (<button><RxCross1 fontSize={24} color="black" />
                            </button>) : (<button className="mr-4">
                                <AiOutlineMenu fontSize={24} color="black" />

                            </button>)
                        }
                    </div>
                    <div>
                        <a>Ecommerce</a>
                    </div>
                </div>
            </div>
            {
                open && <div className="md:hidden bg-slate-800 text-slate-300">
                    <ul className="flex flex-col font-medium gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <li className='hover:text-red-500 cursor-pointer'>Home</li>
                            <li className='hover:text-red-500 cursor-pointer'>Product</li>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <li className='hover:text-red-500 cursor-pointer'>Contact</li>
                            <li className='hover:text-red-500 cursor-pointer'>About</li>
                        </div>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Header