import './App.css';
import Header from "./components/Header/Header"
import Home from "./components/Homepage/Home"
import ProductDetails from './components/Product/ProductDetails';
import Products from "./components/Product/Products"

import { Routes, Route } from "react-router-dom"
import Search from './components/Product/Search';
import LoginForm from "./components/User/LoginForm";
import signUpForm from "./components/User/SignUpForm";
function App() {
  return (

    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        
        <Route path="/products/:keyword" element={<Products/>}></Route>

        <Route path="/search" element={<Search/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/signup" element={<signUpForm/>}></Route>
      </Routes>
    </div>
  );
}
 
export default App;
