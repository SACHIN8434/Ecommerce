import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from "./pages/Orders"
import Orders from './pages/Orders'
import Login from './pages/Login'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/place_order" element={<PlaceOrder/>}/>
        <Route path="/collection" element={<Collection/>}/>
      </Routes>
    </div>
  )
}

export default App