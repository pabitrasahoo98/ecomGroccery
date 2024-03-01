import React from "react";
import './app.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact"
import About from "./pages/About";
import Products from "./pages/Products"
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Search from "./pages/Search";
import ProductDetails from "./components/layout/ProductDetails";
import store from "./Store";
import { loadUser,clearErrors } from "./actions/userAction";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import { fetchCarousel, fetchCatagories, fetchPinCodes } from "./actions/catagoryAction";
import Success from "./pages/Success";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./components/layout/admin/Dashboard";
import OrdersList from "./components/layout/admin/OrdersList";
import AdminProducts from "./components/layout/admin/AdminProducts";
import Users from "./components/layout/admin/Users";
import Catagory from "./components/layout/admin/Catagory";
import Carousels from "./components/layout/admin/Carousels";
import AddProduct from "./components/layout/admin/AddProduct";



function App() {
  const {loading,error,isAuthenticate,user}=useSelector(state=>state.user);
  
  React.useEffect(()=>{
    store.dispatch(loadUser());
    store.dispatch(fetchCatagories());
    store.dispatch(fetchPinCodes());
    store.dispatch(fetchCarousel());
    if(error){
      window.alert(error);
      store.dispatch(clearErrors);
    }
  },[])
  return (
    <BrowserRouter>
    <Routes>
    
      <Route path="/" element={<Home/>} />
      <Route exact path="/products" element={<Products/>}/>
      <Route path="/productdetails" element={<ProductDetails/>}/>
      <Route path="/products/:keyword" element={<Products/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/password/forget" element={<ForgotPassword/>} />
      <Route path="/password/reset/:token" element={<ResetPassword/>} />
      {isAuthenticate && <Route path="/profile/:activepage" element={<Profile/>} />}
      <Route path="/cart" element={<Cart/>} />
      <Route path="/search" element={<Search/>} />
      {isAuthenticate && <Route path="/shipping" element={<Shipping/>} />}
      {isAuthenticate && <Route path="/order/confirm" element={<ConfirmOrder/>} />}
      {isAuthenticate && <Route path="/success" element={<Success/>} />}
      {isAuthenticate && <Route path="/order/:id" element={<OrderDetails/>} />}

      {isAuthenticate&& <Route path="/admin/dashboard" element={<Dashboard role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/orders" element={<OrdersList role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/products" element={<AdminProducts role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/products/new" element={<AddProduct role={user.role}/>} />}

      {isAuthenticate&& <Route path="/admin/users" element={<Users role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/category" element={<Catagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/carousel" element={<Carousels role={user.role}/>} />}

      <Route path="*" element={<Pagenotfound/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
