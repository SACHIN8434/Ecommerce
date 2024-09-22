import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Homepage/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";

import { Routes, Route, Router } from "react-router-dom";
import Search from "./components/Product/Search";
import LoginForm from "./components/User/LoginForm";
import SignUpForm from "./components/User/SignUpForm";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import PrivateRoute from "./components/User/PrivateRoute";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdatePassword from "./components/User/UpdatePassword";
import Cart from "./components/Cart/index";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import AdminRoute from "./components/Admin/AdminRoute";
import { useSelector } from "react-redux";
function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/forgotpassoword" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />}></Route>

        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/user" element={<PrivateRoute />}>
          <Route path="shipping" element={<Shipping />}></Route>
          <Route path="process/payment" element={<Payment />}></Route>
          <Route path="myprofile" element={<Profile />}></Route>
          <Route path="updateprofile" element={<UpdateProfile />}></Route>
          <Route path="success" element={<OrderSuccess />}></Route>
          <Route path="orders" element={<MyOrders />}></Route>
          <Route path="order/confirm" element={<ConfirmOrder />}></Route>
          <Route path="orders/:id" element={<OrderDetails />}></Route>
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          {
            <>
              user.role === "admin" && (
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="products" element={<ProductList />}></Route>
              <Route path="product" element={<NewProduct />}></Route>
              <Route
                path="product/:id"
                element={<UpdateProduct />}
              ></Route>
              <Route path="orders" element={<OrderList />}></Route>
              <Route
                path="orders/:id"
                element={<ProcessOrder />}
              ></Route>
              <Route path="users" element={<UsersList />}></Route>)
            </>
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
