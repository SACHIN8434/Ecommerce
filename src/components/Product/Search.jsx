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
    <form onSubmit={searchSubmitHadler} className="flex items-center justify-center ">
        <input 
        type="text"
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search a product...'

        ></input>
        <input type="submit" value="Search" />
    </form>
        
    </Fragment>
  )
}

export default Search