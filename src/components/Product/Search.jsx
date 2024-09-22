import React, { Fragment,useState } from 'react'
import { useNavigate } from "react-router-dom";


const Search = () => {
    const [keyword,setKeyword] = useState("");

    const navigate= useNavigate();
    const searchSubmitHadler= (e)=>{
        e.preventDefault();
        if(keyword){
           navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }


  return (
    <Fragment>
    <form onSubmit={searchSubmitHadler} className="flex items-center justify-center lg:h-[50vh] lg:w-[100vw] bg-slate-300 mt-5">
        <input 
        type="text"
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search a product...'
        className='lg:w-[30vw] lg:h-[5vh] text-slate-900 font-sans font-medium outline-medium
        border-4 border-orange-800 rounded-md
        '
        ></input>
        <input type="submit" value="Search" />
    </form>
        
    </Fragment>
  )
}

export default Search